<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;
use App\Models\User;
use App\Models\Reservation;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        $services = Service::factory(5)->create();
        $users = User::factory(10)->create();
        $reservation = Reservation::factory(3)->create();
    }
}
