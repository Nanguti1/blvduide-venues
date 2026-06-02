<?php

namespace Database\Factories;

use App\Models\County;
use Illuminate\Database\Eloquent\Factories\Factory;

class CityFactory extends Factory
{
    public function definition(): array
    {
        $cities = ['Nairobi', 'Thika', 'Mombasa', 'Kisumu', 'Nakuru'];
        $name = fake()->randomElement($cities);

        return [
            'county_id' => County::factory(),
            'name' => $name,
            'slug' => str()->slug($name),
        ];
    }
}
