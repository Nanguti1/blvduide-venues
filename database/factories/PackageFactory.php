<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PackageFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->randomElement(['Basic', 'Standard', 'Popular', 'Premium']),
            'price' => fake()->randomFloat(2, 100, 1000),
            'duration_days' => fake()->numberBetween(30, 365),
            'max_listings' => fake()->numberBetween(1, 50),
            'max_images_per_listing' => fake()->numberBetween(5, 50),
            'featured_listing_allowance' => fake()->numberBetween(0, 10),
            'badge_color' => fake()->hexColor(),
            'support_features' => fake()->randomElements(['priority_support', 'analytics', 'custom_domain', 'api_access'], fake()->numberBetween(1, 4)),
            'is_active' => true,
        ];
    }
}
