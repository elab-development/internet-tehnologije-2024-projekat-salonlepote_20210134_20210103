<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ForgotPasswordController;

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

use App\Http\Controllers\ReservationController;
use App\Http\Controllers\UserController;


Route::apiResource('reservations', ReservationController::class);

// Resource ruta za rezervacije
Route::apiResource('reservations', ReservationController::class);

// 1. Obična GET ruta - vraća sve šminkere
Route::get('/makeup-artists', [UserController::class, 'makeupArtists']);

// 2. Ruta sa parametrom - pretraga rezervacija po datumu
Route::get('/reservations/date/{date}', [ReservationController::class, 'reservationsByDate']);

// 3. Custom ruta - otkazivanje rezervacije
Route::post('/reservations/{id}/cancel', [ReservationController::class, 'cancelReservation']);

Route::post('/password/forgot', [ForgotPasswordController::class, 'sendResetLink']);
Route::post('/password/reset', [ForgotPasswordController::class, 'resetPassword']);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

