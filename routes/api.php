<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ForgotPasswordController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\UserController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// 1. Rute za korisnike sa različitim ulogama. 
//Preko Sanctum middleware-a pristup je omogucen samo autentifikovanim korisnicima.
//Preko RoleMiddleware-a proveravamo ulogu i vršimo kontrolu pristupa određenim rutama.

// Rute za admina 
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::apiResource('reservations', ReservationController::class); //Resource ruta za upravljanje rezervacijama (CRUD operacije)
    Route::apiResource('users', UserController::class)->except(['show']); // Resource ruta za upravljanje korisnicima (CRUD operacije)
});

// Rute za šminkere - vidi sve rezervacije koje treba da odradi i može da ažurira status rezervacije
Route::middleware(['auth:sanctum', 'role:makeup_artist'])->group(function () {
    Route::get('/makeup-artist/my-reservations', [ReservationController::class, 'makeupArtistReservations']);
    Route::patch('/reservations/{id}/status', [ReservationController::class, 'updateStatus']);
});

// Rute za klijente - može da kreira rezervaciju, vidi svoje rezervacije i otkaže rezervaciju
Route::middleware(['auth:sanctum', 'role:client'])->group(function () {
    Route::post('/reservations', [ReservationController::class, 'store']);
    Route::get('/client/my-reservations', [ReservationController::class, 'clientReservations']);
    Route::post('/reservations/{id}/cancel', [ReservationController::class, 'cancelReservation']);
});

// 2. Obična GET ruta - vraća sve šminkere
Route::get('/makeup-artists', [UserController::class, 'makeupArtists']);

// 3. Ruta sa parametrom - pretraga rezervacija po datumu
Route::get('/reservations/date/{date}', [ReservationController::class, 'reservationsByDate']);

// 4. Custom ruta - otkazivanje rezervacije
Route::post('/reservations/{id}/cancel', [ReservationController::class, 'cancelReservation']);

// 5. Slanje linka za reset lozinke
Route::post('/password/forgot', [ForgotPasswordController::class, 'sendResetLink']);
// 6. Reset lozinke
Route::post('/password/reset', [ForgotPasswordController::class, 'resetPassword']);

//Register, login, logout
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');


