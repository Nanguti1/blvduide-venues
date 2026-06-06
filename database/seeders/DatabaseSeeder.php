<?php

namespace Database\Seeders;

use App\Models\Package;
use App\Models\User;
use App\Services\SubscriptionService;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            RolesAndPermissionsSeeder::class,
            VenueCategorySeeder::class,
            VenueFeatureSeeder::class,
            LocationSeeder::class,
            PackageSeeder::class,
        ]);

        $admin = User::firstOrCreate(
            ['email' => 'admin@blvdguide.test'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('Nxnangutinze123'),
                'email_verified_at' => now(),
            ],
        );
        $admin->assignRole('Super Admin');

        $agent = User::firstOrCreate(
            ['email' => 'agent@blvdguide.test'],
            [
                'name' => 'Demo Agent',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ],
        );
        $agent->assignRole('Agent');

        $premium = Package::where('name', 'Premium')->first();
        if ($premium) {
            app(SubscriptionService::class)->assignPackage($agent, $premium, 'SEED-ACTIVATION');
        }

        $this->call(DemoVenueSeeder::class);
    }
}
