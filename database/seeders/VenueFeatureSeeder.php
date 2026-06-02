<?php

namespace Database\Seeders;

use App\Models\VenueFeature;
use Illuminate\Database\Seeder;

class VenueFeatureSeeder extends Seeder
{
    public function run(): void
    {
        $features = [
            ['name' => 'WiFi', 'slug' => 'wifi'],
            ['name' => 'Parking', 'slug' => 'parking'],
            ['name' => 'Kitchen', 'slug' => 'kitchen'],
            ['name' => 'Swimming Pool', 'slug' => 'swimming-pool'],
            ['name' => 'Air Conditioning', 'slug' => 'air-conditioning'],
            ['name' => 'Projector', 'slug' => 'projector'],
            ['name' => 'Sound System', 'slug' => 'sound-system'],
            ['name' => 'Wheelchair Accessible', 'slug' => 'wheelchair-accessible'],
            ['name' => 'Catering', 'slug' => 'catering'],
            ['name' => 'Security', 'slug' => 'security'],
            ['name' => '24/7 Access', 'slug' => '24-7-access'],
            ['name' => 'Coffee Machine', 'slug' => 'coffee-machine'],
            ['name' => 'Printer', 'slug' => 'printer'],
            ['name' => 'Whiteboard', 'slug' => 'whiteboard'],
            ['name' => 'Outdoor Space', 'slug' => 'outdoor-space'],
        ];

        foreach ($features as $feature) {
            VenueFeature::firstOrCreate(
                ['slug' => $feature['slug']],
                $feature
            );
        }
    }
}
