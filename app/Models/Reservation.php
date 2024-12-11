<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'makeup_artist_id',
        'service_id',
        'date',
        'time',
        'status',
    ];

    // Relacija: Rezervacija pripada korisniku
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Relacija: Rezervacija pripada šminkeru
    public function makeupArtist(): BelongsTo
    {
        return $this->belongsTo(User::class, 'makeup_artist_id');
    }

    // Relacija: Rezervacija je povezana sa uslugom
    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }
}
