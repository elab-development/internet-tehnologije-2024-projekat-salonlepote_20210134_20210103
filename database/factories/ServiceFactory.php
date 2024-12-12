<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ServiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $services = [
            'Manicure' => 'A relaxing manicure to rejuvenate your hands.',
            'Pedicure' => 'A soothing pedicure for perfectly groomed feet.',
            'Haircut' => 'A stylish haircut to enhance your appearance.',
            'Facial' => 'A deep-cleansing facial for glowing skin.',
            'Massage' => 'A therapeutic massage to ease your stress.'
        ];

        $name = $this->faker->randomElement(array_keys($services));

        return [
            'name' => $name,
            'description' => $services[$name],
            'price' => $this->faker->randomFloat(2, 20, 200),
        ];
    }
}
