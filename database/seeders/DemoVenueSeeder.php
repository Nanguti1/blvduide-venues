<?php

namespace Database\Seeders;

use App\Enums\VenueApprovalStatus;
use App\Enums\VenueOperationalStatus;
use App\Models\Country;
use App\Models\User;
use App\Models\Venue;
use App\Models\VenueCategory;
use App\Models\VenueFeature;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DemoVenueSeeder extends Seeder
{
    public function run(): void
    {
        $agent = User::where('email', 'agent@blvdguide.test')->first();

        if (! $agent) {
            return;
        }

        $kenya = Country::where('iso2', 'KE')->first();
        $category = VenueCategory::first();
        $features = VenueFeature::limit(4)->pluck('id');
        $nairobi = $kenya?->counties()->where('slug', 'nairobi')->first();
        $city = $nairobi?->cities()->where('slug', 'nairobi')->first();
        $locale = $city?->locales()->where('slug', 'kilimani')->first();

        if (! $category || ! $kenya || ! $nairobi || ! $city) {
            return;
        }

        $venues = [
            [
                'title' => 'Kilimani Creative Loft',
                'short_description' => 'Sunlit loft ideal for workshops and photo shoots.',
                'description' => 'A versatile creative loft in the heart of Kilimani with high ceilings, natural light, and flexible seating for up to 80 guests.',
                'price' => 250,
                'capacity' => 80,
                'featured' => true,
            ],
            [
                'title' => 'Westlands Executive Boardroom',
                'short_description' => 'Premium meeting space with AV setup.',
                'description' => 'Fully serviced boardroom with projector, video conferencing, and concierge support for corporate meetings.',
                'price' => 120,
                'capacity' => 20,
                'featured' => true,
            ],
            [
                'title' => 'Karen Garden Wedding Pavilion',
                'short_description' => 'Outdoor garden venue for unforgettable celebrations.',
                'description' => 'Lush garden pavilion surrounded by mature trees, perfect for weddings and private celebrations up to 200 guests.',
                'price' => 900,
                'capacity' => 200,
                'featured' => false,
            ],
        ];

        foreach ($venues as $data) {
            $venue = Venue::firstOrCreate(
                ['slug' => Str::slug($data['title'])],
                [
                    ...$data,
                    'user_id' => $agent->id,
                    'venue_category_id' => $category->id,
                    'country_id' => $kenya->id,
                    'county_id' => $nairobi->id,
                    'city_id' => $city->id,
                    'locale_id' => $locale?->id,
                    'operational_status' => VenueOperationalStatus::Available->value,
                    'approval_status' => VenueApprovalStatus::Published->value,
                    'published_at' => now()->subDays(3),
                    'address' => 'Nairobi, Kenya',
                    'contact_email' => 'agent@blvdguide.test',
                ],
            );

            $venue->features()->sync($features);
        }
    }
}
