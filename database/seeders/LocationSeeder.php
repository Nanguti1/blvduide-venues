<?php

namespace Database\Seeders;

use App\Models\City;
use App\Models\Country;
use App\Models\County;
use App\Models\Locale;
use Illuminate\Database\Seeder;

class LocationSeeder extends Seeder
{
    public function run(): void
    {
        // Create Kenya
        $kenya = Country::firstOrCreate(
            ['iso2' => 'KE'],
            ['name' => 'Kenya', 'slug' => 'kenya']
        );

        // Create Counties
        $nairobi = County::firstOrCreate(
            ['country_id' => $kenya->id, 'slug' => 'nairobi'],
            ['name' => 'Nairobi', 'slug' => 'nairobi']
        );

        $kiambu = County::firstOrCreate(
            ['country_id' => $kenya->id, 'slug' => 'kiambu'],
            ['name' => 'Kiambu', 'slug' => 'kiambu']
        );

        $mombasa = County::firstOrCreate(
            ['country_id' => $kenya->id, 'slug' => 'mombasa'],
            ['name' => 'Mombasa', 'slug' => 'mombasa']
        );

        // Create Cities
        $nairobiCity = City::firstOrCreate(
            ['county_id' => $nairobi->id, 'slug' => 'nairobi'],
            ['name' => 'Nairobi', 'slug' => 'nairobi']
        );

        $thika = City::firstOrCreate(
            ['county_id' => $kiambu->id, 'slug' => 'thika'],
            ['name' => 'Thika', 'slug' => 'thika']
        );

        $mombasaCity = City::firstOrCreate(
            ['county_id' => $mombasa->id, 'slug' => 'mombasa'],
            ['name' => 'Mombasa', 'slug' => 'mombasa']
        );

        // Create Locales for Nairobi
        $nairobiLocales = [
            ['name' => 'Karen', 'slug' => 'karen'],
            ['name' => 'Kilimani', 'slug' => 'kilimani'],
            ['name' => 'Westlands', 'slug' => 'westlands'],
            ['name' => 'Lavington', 'slug' => 'lavington'],
            ['name' => 'Muthaiga', 'slug' => 'muthaiga'],
            ['name' => 'Upper Hill', 'slug' => 'upper-hill'],
            ['name' => 'Industrial Area', 'slug' => 'industrial-area'],
        ];

        foreach ($nairobiLocales as $locale) {
            Locale::firstOrCreate(
                ['city_id' => $nairobiCity->id, 'slug' => $locale['slug']],
                $locale
            );
        }

        // Create Locales for Thika
        $thikaLocales = [
            ['name' => 'Kiambu Road', 'slug' => 'kiambu-road'],
            ['name' => 'Makongeni', 'slug' => 'makongeni'],
        ];

        foreach ($thikaLocales as $locale) {
            Locale::firstOrCreate(
                ['city_id' => $thika->id, 'slug' => $locale['slug']],
                $locale
            );
        }
    }
}
