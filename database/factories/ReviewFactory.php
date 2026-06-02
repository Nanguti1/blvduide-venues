<?php

namespace Database\Factories;

use App\Enums\ReviewStatus;
use App\Models\User;
use App\Models\Venue;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReviewFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'venue_id' => Venue::factory(),
            'rating' => fake()->numberBetween(1, 5),
            'comment' => fake()->paragraph(),
            'status' => ReviewStatus::Approved,
        ];
    }
}
