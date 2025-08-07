<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class HolidayController extends Controller
{
    public function getHolidays($year)
    {
        $apiKey = env('CALENDARIFIC_API_KEY');
        $country = 'RS'; 

        $response = Http::withOptions([
        'verify' => false
        ])->get("https://calendarific.com/api/v2/holidays", [
            'api_key' => $apiKey,
            'country' => $country,
            'year' => $year,
        ]);

        if ($response->successful()) {
            
            $holidays = collect($response['response']['holidays'])
                        ->filter(function ($holiday) {
                            return in_array('National holiday', $holiday['type']);
                        })
                        ->map(function ($holiday) {
                            return [
                                'name' => $holiday['name'],
                                'date' => $holiday['date']['iso'],
                                'type' => $holiday['type'][0] ?? null,
                            ];
                        });

            return response()->json($holidays);
        } else {
            return response()->json(['error' => 'Cannot fetch holidays'], 500);
        }
    }
}
