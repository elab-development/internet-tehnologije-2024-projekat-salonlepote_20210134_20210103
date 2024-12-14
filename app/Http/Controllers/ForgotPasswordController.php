<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use App\Models\User;

class ForgotPasswordController extends Controller
{
    /**
     * Šalje link za reset lozinke korisniku na mail.
     */
    public function sendResetLink(Request $request)
    {
        // Validacija email-a
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        // Slanje linka
        $status = Password::sendResetLink($request->only('email'));

        if ($status === Password::RESET_LINK_SENT) {
            return response()->json([
                'success' => true,
                'message' => 'Reset link sent to your email.'
            ], 200);
        }

        return response()->json([
            'success' => false,
            'message' => 'Failed to send reset link.'
        ], 500);
    }

    /**
     * Resetuje lozinku korisnika pomoću reset tokena.
     */
    public function resetPassword(Request $request)
    {
        // Validacija unosa
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'token' => 'required',
            'password' => 'required|min:6|confirmed',
        ]);

        // Reset lozinke
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password),
                    'updated_at' => Carbon::now()
                ])->save();
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            return response()->json([
                'success' => true,
                'message' => 'Password has been reset successfully.'
            ], 200);
        }

        return response()->json([
            'success' => false,
            'message' => 'Invalid token or email.'
        ], 500);
    }
}

