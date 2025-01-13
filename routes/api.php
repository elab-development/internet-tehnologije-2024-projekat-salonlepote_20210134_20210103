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

// 1. Resource ruta za upravljanje rezervacijama (CRUD operacije). 
//Preko Sanctum middleware-a pristup je omogucen samo autentifikovanim korisnicima.
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('reservations', ReservationController::class);
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