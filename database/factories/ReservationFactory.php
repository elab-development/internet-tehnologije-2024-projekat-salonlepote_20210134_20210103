<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Service;

class ReservationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
           'user_id' => User::where('role', 'client')->inRandomOrder()->first()->id, // Assign client role
            'makeup_artist_id' => User::where('role', 'makeup_artist')->inRandomOrder()->first()->id, // Assign makeup artist role
            'service_id' => Service::factory(), // Service factory
            'date' => $this->faker->date(),
            'time' => $this->faker->time(),
            'status' => $this->faker->randomElement(['pending', 'completed', 'cancelled']),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
