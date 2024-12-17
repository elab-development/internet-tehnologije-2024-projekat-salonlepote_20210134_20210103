<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\ReservationController;
use App\Mail\ReservationConfirmation;
use Illuminate\Support\Facades\Mail;



class ReservationController extends Controller
{
    // Resource metoda - vraća sve rezervacije
    public function index()
    {
        // Uzimanje parametara za filtriranje iz requesta
        $status = $request->query('status'); // npr. 'confirmed', 'pending'
        $date = $request->query('date');     // npr. '2024-06-01'

        // Kreiranje query-ja sa filtriranjem
        $query = Reservation::query();

        if ($status) {
            $query->where('status', $status);
        }

        if ($date) {
            $query->whereDate('created_at', $date);
        }

        // Primena paginacije (default: 10 po strani)
        $perPage = $request->query('per_page', 10); // korisnik može definisati broj po strani
        $reservations = $query->paginate($perPage);

        // Vraćanje rezultata u JSON formatu
        return response()->json([
            'success' => true,
            'data' => $reservations
        ], 200);
    
    }

    // Resource metoda - kreira novu rezervaciju
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'service_id' => 'required|exists:services,id',
            'date' => 'required|date',
            'time' => 'required',
            'user_id' => 'required|exists:users,id',
        ]);
    
        // Proveri da li termin već postoji
        $exists = Reservation::where('date', $validated['date'])
                             ->where('time', $validated['time'])
                             ->exists();
    
        if ($exists) {
            return response()->json(['error' => 'Termin je već zauzet.'], 422);
        }
    
        // Kreiraj rezervaciju
        Reservation::create([
            'user_id' => $validated['user_id'],
            'date' => $validated['date'],
            'time' => $validated['time'],
            'status' => 'confirmed'
        ]);
    
        return response()->json(['message' => 'Rezervacija je uspešno kreirana.']);
    }

    // Resource metoda - vraća jednu rezervaciju
    public function show($id)
    {
        $reservation = Reservation::find($id);

        if (!$reservation) {
            return response()->json(['error' => 'Reservation not found'], Response::HTTP_NOT_FOUND);
        }

        return response()->json($reservation, Response::HTTP_OK);
    }

    // Custom metoda - pretraga rezervacija po datumu
    public function reservationsByDate($date)
    {
        $reservations = Reservation::where('date', $date)->get();

        return response()->json($reservations, Response::HTTP_OK);
    }

    // Custom metoda - otkazivanje rezervacije
    public function cancelReservation($id)
    {
        $reservation = Reservation::find($id);

        if (!$reservation) {
            return response()->json(['error' => 'Reservation not found'], Response::HTTP_NOT_FOUND);
        }

        $reservation->update(['status' => 'cancelled']);

        return response()->json(['message' => 'Reservation cancelled successfully'], Response::HTTP_OK);
    }
    public function search(Request $request)
    {
        // Dohvati query parametre iz requesta
        $status = $request->query('status');         // Filtriranje po statusu
        $userName = $request->query('user_name');    // Filtriranje po imenu korisnika
        $phone = $request->query('phone');           // Filtriranje po broju telefona
        $date = $request->query('date');             // Filtriranje po datumu

        // Kreiranje query-ja
        $query = Reservation::query();

        // Filtriranje po statusu
        if ($status) {
            $query->where('status', $status);
        }

        // Filtriranje po imenu korisnika (povezivanje sa User modelom)
        if ($userName) {
            $query->whereHas('user', function ($q) use ($userName) {
                $q->where('name', 'like', "%{$userName}%");
            });
        }

        // Filtriranje po broju telefona
        if ($phone) {
            $query->whereHas('user', function ($q) use ($phone) {
                $q->where('phone', 'like', "%{$phone}%");
            });
        }

        // Filtriranje po datumu rezervacije
        if ($date) {
            $query->whereDate('created_at', $date);
        }

        // Dohvati rezultate
        $results = $query->get();

        // Vrati podatke u JSON formatu
        return response()->json([
            'success' => true,
            'data' => $results
        ], 200);
    }



    //Slanje mejlova
    public function confirmReservation($reservationId)
    {
        // Pronađi rezervaciju u bazi
        $reservation = Reservation::find($reservationId);

        if (!$reservation) {
            return response()->json(['message' => 'Reservation not found'], 404);
        }

        // Oznaci rezervaciju kao potvrđenu
        $reservation->status = 'confirmed';
        $reservation->save();

        // Poslati potvrdu na email korisniku
        $user = $reservation->user;  // Pretpostavljamo da postoji veza sa korisnikom
        Mail::to($user->email)->send(new ReservationConfirmation($user));

        return response()->json(['message' => 'Reservation confirmed and email sent']);
    }

    //Sprecavanje istovremene rezervacije (napredno upravljanje rezervacijama)
    public function makeReservation(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'date' => 'required|date|after_or_equal:today', // Validacija za datum
            'time' => 'required|date_format:H:i:s',         // Validacija za vreme (HH:mm:ss)
        ]);

        $userId = $request->input('user_id');
        $date = $request->input('date'); // npr. '2024-12-20'
        $time = $request->input('time'); // npr. '14:30:00'

        // Provera da li postoji rezervacija za isti datum i vreme
        $exists = Reservation::where('date', $date)
                             ->where('time', $time)
                             ->where('status', '!=', 'canceled') // Opcionalno: dozvoli otkazane termine
                             ->exists();

        if ($exists) {
            return response()->json(['message' => 'Reservation time is already taken.'], 409);
        }

        // Kreiraj rezervaciju
        $reservation = Reservation::create([
            'user_id' => $userId,
            'date' => $date,
            'time' => $time,
            'status' => 'confirmed',
        ]);

        return response()->json([
            'message' => 'Reservation successful!',
            'reservation' => $reservation
        ], 201);
    }
}
