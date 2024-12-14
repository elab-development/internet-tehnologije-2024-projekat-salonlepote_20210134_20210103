<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Carbon\Carbon;

class ReservationConfirmation extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $reservation_date;

    /**
     * Create a new message instance.
     *
     * @param  object  $user
     * @return void
     */
    public function __construct($user)
    {
        $this->user = $user;
         // Dohvatanje prve aktivne rezervacije korisnika
         $reservation = $user->reservations()->latest()->first();

         if ($reservation) {
             // Formatiraj datum i vreme
             $this->reservation_date = Carbon::parse($reservation->reservation_date)->format('d-m-Y | H:i');
         }
    }

    /**
     * Build the message.
     *
     * @return \Illuminate\Mail\Mailable
     */
    public function build()
    {
        return $this->view('emails.reservation_confirmation')
                    ->with([
                        'name' => $this->user->name,
                        'reservation_date' =>  $this->reservation_date,
                    ]);
    }
}
