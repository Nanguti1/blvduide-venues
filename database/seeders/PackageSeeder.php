<?php

namespace Database\Seeders;

use App\Models\Package;
use Illuminate\Database\Seeder;

class PackageSeeder extends Seeder
{
    public function run(): void
    {
        $packages = [
            [
                'name' => 'Basic',
                'price' => 99.00,
                'duration_days' => 30,
                'max_listings' => 5,
                'max_images_per_listing' => 10,
                'featured_listing_allowance' => 0,
                'badge_color' => '#64748b',
                'support_features' => ['email_support'],
                'is_active' => true,
            ],
            [
                'name' => 'Standard',
                'price' => 199.00,
                'duration_days' => 30,
                'max_listings' => 15,
                'max_images_per_listing' => 20,
                'featured_listing_allowance' => 2,
                'badge_color' => '#3b82f6',
                'support_features' => ['email_support', 'priority_support'],
                'is_active' => true,
            ],
            [
                'name' => 'Popular',
                'price' => 349.00,
                'duration_days' => 30,
                'max_listings' => 30,
                'max_images_per_listing' => 35,
                'featured_listing_allowance' => 5,
                'badge_color' => '#8b5cf6',
                'support_features' => ['email_support', 'priority_support', 'analytics'],
                'is_active' => true,
            ],
            [
                'name' => 'Premium',
                'price' => 599.00,
                'duration_days' => 30,
                'max_listings' => 100,
                'max_images_per_listing' => 50,
                'featured_listing_allowance' => 15,
                'badge_color' => '#f59e0b',
                'support_features' => ['email_support', 'priority_support', 'analytics', 'custom_domain', 'api_access'],
                'is_active' => true,
            ],
        ];

        foreach ($packages as $package) {
            Package::firstOrCreate(
                ['name' => $package['name']],
                $package
            );
        }
    }
}
