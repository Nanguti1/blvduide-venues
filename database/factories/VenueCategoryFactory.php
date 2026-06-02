<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class VenueCategoryFactory extends Factory
{
    public function definition(): array
    {
        $categories = [
            'Coworking Spaces',
            'Wedding Venues',
            'Studio Venues',
            'Meeting Rooms',
            'Conference Halls',
            'Lofts',
            'Gardens',
            'Serviced Offices',
        ];

        $name = fake()->randomElement($categories);

        return [
            'name' => $name,
            'slug' => str()->slug($name),
            'icon' => fake()->randomElement(['building', 'home', 'office', 'calendar', 'users', 'map-pin']),
        ];
    }
}
