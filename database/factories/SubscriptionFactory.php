<?php

namespace Database\Factories;

use App\Enums\PaymentStatus;
use App\Enums\SubscriptionStatus;
use App\Models\Package;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class SubscriptionFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'package_id' => Package::factory(),
            'starts_at' => fake()->dateTimeBetween('-1 year', 'now'),
            'expires_at' => fake()->dateTimeBetween('+1 month', '+1 year'),
            'payment_status' => PaymentStatus::Completed,
            'transaction_reference' => fake()->uuid(),
            'status' => SubscriptionStatus::Active,
        ];
    }
}
