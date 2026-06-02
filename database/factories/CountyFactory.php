<?php

namespace Database\Factories;

use App\Models\Country;
use Illuminate\Database\Eloquent\Factories\Factory;

class CountyFactory extends Factory
{
    public function definition(): array
    {
        $counties = ['Nairobi', 'Kiambu', 'Mombasa', 'Kisumu', 'Nakuru'];
        $name = fake()->randomElement($counties);

        return [
            'country_id' => Country::factory(),
            'name' => $name,
            'slug' => str()->slug($name),
        ];
    }
}
