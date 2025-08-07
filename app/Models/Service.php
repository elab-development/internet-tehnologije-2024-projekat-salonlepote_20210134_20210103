<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'service_description',
        'price',
    ];

    // Relacija: Usluga može biti deo više rezervacija
    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}
