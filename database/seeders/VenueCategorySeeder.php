<?php

namespace Database\Seeders;

use App\Models\VenueCategory;
use Illuminate\Database\Seeder;

class VenueCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Coworking Spaces', 'slug' => 'coworking-spaces', 'icon' => 'building-2'],
            ['name' => 'Wedding Venues', 'slug' => 'wedding-venues', 'icon' => 'heart'],
            ['name' => 'Studio Venues', 'slug' => 'studio-venues', 'icon' => 'camera'],
            ['name' => 'Meeting Rooms', 'slug' => 'meeting-rooms', 'icon' => 'users'],
            ['name' => 'Conference Halls', 'slug' => 'conference-halls', 'icon' => 'presentation'],
            ['name' => 'Lofts', 'slug' => 'lofts', 'icon' => 'home'],
            ['name' => 'Gardens', 'slug' => 'gardens', 'icon' => 'leaf'],
            ['name' => 'Serviced Offices', 'slug' => 'serviced-offices', 'icon' => 'briefcase'],
        ];

        foreach ($categories as $category) {
            VenueCategory::firstOrCreate(
                ['slug' => $category['slug']],
                $category
            );
        }
    }
}
