<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
     // Resource metoda - vraća sve rezervacije
     public function index()
    {
        return response()->json(Reservation::all(), Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
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

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    // Resource metoda - vraća jednu rezervaciju
    public function show($id)
    {
        $reservation = Reservation::find($id);

        if (!$reservation) {
            return response()->json(['error' => 'Reservation not found'], Response::HTTP_NOT_FOUND);
        }

        return response()->json($reservation, Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    //Ažurira postojeću rezervaciju
    public function update(Request $request, $id)
    {
          // Pronalaženje rezervacije po ID-ju
          $reservation = Reservation::find($id);

          if (!$reservation) {
              return response()->json([
                  'success' => false,
                  'message' => 'Reservation not found.'
              ], 404);
          }
  
          // Validacija podataka
          $validated = $request->validate([
              'date' => 'required|date',
              'time' => 'required',
              'service_id' => 'required|exists:services,id',
              'status' => 'required|in:pending,confirmed,cancelled'
          ]);
  
          // Ažuriranje rezervacije
          $reservation->update($validated);
  
          return response()->json([
              'success' => true,
              'message' => 'Reservation updated successfully.',
              'data' => $reservation
          ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    //Briše rezervaciju
    public function destroy($id)
    {
        // Pronalaženje rezervacije po ID-ju
        $reservation = Reservation::find($id);

        if (!$reservation) {
            return response()->json([
                'success' => false,
                'message' => 'Reservation not found.'
            ], 404);
        }

        // Brisanje rezervacije
        $reservation->delete();

        return response()->json([
            'success' => true,
            'message' => 'Reservation deleted successfully.'
        ], 200);
    
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
