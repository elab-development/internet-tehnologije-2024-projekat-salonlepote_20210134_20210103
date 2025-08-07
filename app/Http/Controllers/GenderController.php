<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class GenderController extends Controller
{
    public function detectGender($name)
    {
        try {
            $url = env('GENDERIZE_API_URL', 'https://api.genderize.io');

            // Priprema parametara
            $params = [
                'name' => $name
            ];

            // Dodaj API key ako postoji
            if (env('GENDERIZE_API_KEY')) {
                $params['apikey'] = env('GENDERIZE_API_KEY');
            }

            // Poziv API-ja
            $response = Http::get($url, $params);

            // Provera da li je uspešno
            if ($response->successful()) {
                $data = $response->json();

                return response()->json([
                    'ime' => $data['name'] ?? $name,
                    'pol' => match ($data['gender'] ?? null) {
                        'male' => 'muško',
                        'female' => 'žensko',
                        default => 'nepoznato'
                    },
                    'vjerovatnoća' => $data['probability'] ?? null
                ]);
            }

            return response()->json([
                'error' => 'Greška pri kontaktiranju Genderize API-ja'
            ], 500);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Došlo je do greške: ' . $e->getMessage()
            ], 500);
        }
    }
}
