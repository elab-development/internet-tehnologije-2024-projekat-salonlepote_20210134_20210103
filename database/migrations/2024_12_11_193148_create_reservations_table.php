<?php
 
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
 
return new class extends Migration
{
    public function up()
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // Korisnik
            $table->foreignId('makeup_artist_id')->constrained('users')->onDelete('cascade'); // Šminker
            $table->foreignId('service_id')->constrained('services')->onDelete('cascade'); // Usluga
            $table->date('date');
            $table->time('time');
            $table->enum('status', ['pending', 'confirmed', 'cancelled'])->default('pending');
            $table->timestamps();
        });
    }
 
    public function down()
    {
        Schema::dropIfExists('reservations');
    }
};