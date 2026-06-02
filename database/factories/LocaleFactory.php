<?php

namespace Database\Factories;

use App\Models\City;
use Illuminate\Database\Eloquent\Factories\Factory;

class LocaleFactory extends Factory
{
    public function definition(): array
    {
        $locales = ['Karen', 'Kiambu Road', 'Kilimani', 'Westlands', 'Lavington', 'Muthaiga'];
        $name = fake()->randomElement($locales);

        return [
            'city_id' => City::factory(),
            'name' => $name,
            'slug' => str()->slug($name),
        ];
    }
}
