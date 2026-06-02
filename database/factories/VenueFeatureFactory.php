<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class VenueFeatureFactory extends Factory
{
    public function definition(): array
    {
        $features = [
            'WiFi',
            'Parking',
            'Kitchen',
            'Swimming Pool',
            'Air Conditioning',
            'Projector',
            'Sound System',
            'Wheelchair Accessible',
            'Catering',
            'Security',
        ];

        $name = fake()->randomElement($features);

        return [
            'name' => $name,
            'slug' => str()->slug($name),
        ];
    }
}
