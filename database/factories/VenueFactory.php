<?php

namespace Database\Factories;

use App\Enums\VenueApprovalStatus;
use App\Enums\VenueOperationalStatus;
use App\Models\User;
use App\Models\VenueCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

class VenueFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'venue_category_id' => VenueCategory::factory(),
            'country_id' => 1,
            'county_id' => 1,
            'city_id' => 1,
            'locale_id' => 1,
            'title' => fake()->words(3, true),
            'slug' => fake()->slug(),
            'description' => fake()->paragraphs(3, true),
            'short_description' => fake()->sentence(),
            'operational_status' => VenueOperationalStatus::Available,
            'approval_status' => VenueApprovalStatus::Published,
            'featured' => fake()->boolean(20),
            'price' => fake()->randomFloat(2, 100, 10000),
            'address' => fake()->address(),
            'latitude' => fake()->latitude(-1.5, -1.2),
            'longitude' => fake()->longitude(36.7, 37.0),
            'contact_email' => fake()->email(),
            'contact_phone' => fake()->phoneNumber(),
            'website' => fake()->url(),
            'capacity' => fake()->numberBetween(10, 500),
            'published_at' => fake()->dateTimeBetween('-1 year', 'now'),
            'expires_at' => fake()->dateTimeBetween('+1 month', '+1 year'),
            'meta_title' => fake()->sentence(),
            'meta_description' => fake()->sentence(),
        ];
    }
}
