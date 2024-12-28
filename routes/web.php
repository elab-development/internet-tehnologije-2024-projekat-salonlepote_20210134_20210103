<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ReservationController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// Ruta za prikaz forme za reset lozinke (naveden je placeholder)
Route::get('/password/reset/{token}', function ($token) {
    return response()->json([
        'message' => 'Reset password form placeholder.',
        'token' => $token,
    ]);
})->name('password.reset');

//ruta za potvrdu rezervacija, slanje mejlova
Route::get('/confirm-reservation/{reservationId}', [ReservationController::class, 'confirmReservation']);