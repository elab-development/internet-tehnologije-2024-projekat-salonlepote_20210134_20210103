<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Http\Response;



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
        ]);

        $reservation = Reservation::create($validated);

        return response()->json($reservation, Response::HTTP_CREATED);
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
}
