<?php

namespace Database\Seeders;

use App\Enums\VenueApprovalStatus;
use App\Enums\VenueOperationalStatus;
use App\Models\City;
use App\Models\Country;
use App\Models\County;
use App\Models\Locale;
use App\Models\User;
use App\Models\Venue;
use App\Models\VenueCategory;
use App\Models\VenueFeature;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class WordpressPropertySeeder extends Seeder
{
    public function run(): void
    {
        $csvPath = public_path('Properties-Export-2026-June-07-0845.csv');

        if (! file_exists($csvPath)) {
            $this->command?->error("CSV file not found at public/Properties-Export-2026-June-07-0845.csv");
            return;
        }

        $agent = User::query()->where('email', 'agent@blvdguide.test')->first() ?? User::query()->first();
        if (! $agent) {
            $this->command?->error('No user found to assign imported venues to. Seed users first.');
            return;
        }

        $file = new \SplFileObject($csvPath, 'r');
        $file->setFlags(\SplFileObject::READ_CSV | \SplFileObject::READ_AHEAD | \SplFileObject::SKIP_EMPTY);
        $file->setCsvControl(',', '"', '\\');

        $headers = [];
        $imported = 0;

        foreach ($file as $index => $row) {
            if ($row === false || $row === [null]) {
                continue;
            }

            if ($index === 0) {
                $headers = array_map(fn ($header) => trim($header), $row);
                continue;
            }

            if (count($row) !== count($headers)) {
                continue;
            }

            $record = array_combine($headers, $row);
            if (! $record || Str::lower(trim($record['Post Type'] ?? '')) !== 'property') {
                continue;
            }

            $title = trim($record['Title'] ?? '');
            if ($title === '') {
                continue;
            }

            $slug = $this->makeSlug($record['Permalink'] ?? $title);
            $description = trim($record['Content'] ?? '');
            $excerpt = trim($record['Excerpt'] ?? '');
            $shortDescription = $this->makeShortDescription($excerpt, $description);
            $category = $this->resolveCategory($record['Type'] ?? 'Uncategorized');
            $locations = $this->resolveLocation($record);
            $coordinates = $this->parseCoordinates($record['fave_property_location'] ?? '');
            $capacity = $this->parseCapacity($record['fave_property_size'] ?? '');
            $imageUrls = $this->parseImageUrls($record['Image URL'] ?? '');
            $address = $this->resolveAddress($record, $locations['city_name'], $locations['locale_name']);
            $website = null;
            $publishedAt = now()->subMinutes(5);

            $venue = Venue::updateOrCreate(
                ['slug' => $slug],
                [
                    'user_id' => $agent->id,
                    'venue_category_id' => $category->id,
                    'country_id' => $locations['country']->id,
                    'county_id' => $locations['county']->id,
                    'city_id' => $locations['city']->id,
                    'locale_id' => $locations['locale']?->id,
                    'title' => $title,
                    'slug' => $slug,
                    'description' => $description ?: $shortDescription,
                    'short_description' => $shortDescription,
                    'operational_status' => VenueOperationalStatus::Available->value,
                    'approval_status' => VenueApprovalStatus::Published->value,
                    'featured' => false,
                    'price' => null,
                    'address' => $address,
                    'latitude' => $coordinates['latitude'],
                    'longitude' => $coordinates['longitude'],
                    'contact_email' => null,
                    'contact_phone' => null,
                    'website' => $website,
                    'capacity' => $capacity,
                    'published_at' => $publishedAt,
                    'expires_at' => null,
                    'meta_title' => $title,
                    'meta_description' => $shortDescription,
                ],
            );

            $featureIds = $this->resolveFeatureIds($record['Features'] ?? '', $record['Labels'] ?? '');
            if (! empty($featureIds)) {
                $venue->features()->sync($featureIds);
            }

            if (! empty($imageUrls)) {
                $this->importImages($venue, $imageUrls);
            }

            $imported++;
        }

        $this->command?->info("Imported {$imported} venue(s) from WordPress CSV.");
    }

    private function makeSlug(string $permalink): string
    {
        $permalink = trim($permalink);

        if (str_contains($permalink, '/')) {
            $permalink = trim(parse_url($permalink, PHP_URL_PATH) ?: $permalink, '/');
            $permalink = explode('/', $permalink);
            $permalink = end($permalink) ?: $permalink[0];
        }

        return Str::slug($permalink ?: 'venue-'.Str::random(6));
    }

    private function makeShortDescription(string $excerpt, string $content): string
    {
        if ($excerpt !== '') {
            return Str::limit(trim(strip_tags($excerpt)), 200);
        }

        return Str::limit(trim(strip_tags($content)), 200);
    }

    private function resolveCategory(string $type): VenueCategory
    {
        $cleanType = trim($type);

        if ($cleanType === '') {
            $cleanType = 'Uncategorized';
        }

        $slug = Str::slug($cleanType);

        return VenueCategory::firstOrCreate(
            ['slug' => $slug],
            ['name' => Str::title(str_replace(['-', '_'], ' ', $cleanType)), 'slug' => $slug]
        );
    }

    private function resolveLocation(array $record): array
    {
        $countryName = trim($record['Country'] ?? 'Kenya');
        $countryIso2 = $this->guessCountryIso2($countryName);
        $countrySlug = Str::slug($countryName ?: 'kenya');

        $country = Country::firstOrCreate(
            ['iso2' => $countryIso2],
            ['name' => $countryName, 'slug' => $countrySlug]
        );

        $cityName = trim($record['City'] ?: $record['State'] ?: 'Nairobi');
        $countyName = $this->guessCountyName($cityName, trim($record['State'] ?? ''));
        $localeName = trim($record['Area'] ?: $cityName);

        $county = County::firstOrCreate(
            ['country_id' => $country->id, 'slug' => Str::slug($countyName)],
            ['name' => $countyName, 'slug' => Str::slug($countyName)]
        );

        $city = City::firstOrCreate(
            ['county_id' => $county->id, 'slug' => Str::slug($cityName)],
            ['name' => $cityName, 'slug' => Str::slug($cityName)]
        );

        $locale = Locale::firstOrCreate(
            ['city_id' => $city->id, 'slug' => Str::slug($localeName)],
            ['name' => $localeName, 'slug' => Str::slug($localeName)]
        );

        return [
            'country' => $country,
            'county' => $county,
            'city' => $city,
            'locale' => $locale,
            'city_name' => $cityName,
            'locale_name' => $localeName,
        ];
    }

    private function guessCountryIso2(string $countryName): string
    {
        $name = Str::lower($countryName);

        return match (true) {
            str_contains($name, 'kenya') => 'KE',
            default => 'KE',
        };
    }

    private function guessCountyName(string $cityName, string $stateName): string
    {
        $city = Str::lower($cityName);
        $state = Str::lower($stateName);

        if ($state !== '') {
            return $state;
        }

        if (str_contains($city, 'kiambu')) {
            return 'Kiambu';
        }

        if (str_contains($city, 'mombasa')) {
            return 'Mombasa';
        }

        return 'Nairobi';
    }

    private function parseCoordinates(string $location): array
    {
        $location = trim($location);
        $location = trim($location, "' \t\n\r\0\x0B");

        if (preg_match('/(-?\d+(?:\.\d+)?)[^\d\-]+(-?\d+(?:\.\d+)?)/', $location, $matches)) {
            return [
                'latitude' => $matches[1],
                'longitude' => $matches[2],
            ];
        }

        return ['latitude' => null, 'longitude' => null];
    }

    private function parseCapacity(string $size): ?int
    {
        $size = trim($size);
        if ($size === '') {
            return null;
        }

        return is_numeric($size) ? (int) $size : null;
    }

    private function parseImageUrls(string $imageUrls): array
    {
        return array_values(array_filter(array_map(fn ($url) => trim($url), preg_split('/\|+/', $imageUrls))));
    }

    private function resolveAddress(array $record, string $cityName, string $localeName): ?string
    {
        $area = trim($record['Area'] ?? '');
        $address = [];

        if ($area !== '') {
            $address[] = $area;
        }

        if ($cityName !== '') {
            $address[] = $cityName;
        }

        return $address !== [] ? implode(', ', $address) : null;
    }

    private function resolveFeatureIds(string $featureString, string $labelString): array
    {
        $labels = array_merge(
            array_filter(array_map(fn ($feature) => trim($feature), preg_split('/\|+/', $featureString))),
            array_filter(array_map(fn ($label) => trim($label), preg_split('/\|+/', $labelString))),
        );

        $featureIds = [];

        foreach ($labels as $label) {
            if ($label === '') {
                continue;
            }

            $name = Str::title(trim(Str::replace('>', ' ', $label)));
            $slug = Str::slug($name);

            $feature = VenueFeature::firstOrCreate(
                ['slug' => $slug],
                ['name' => $name, 'slug' => $slug]
            );

            $featureIds[] = $feature->id;
        }

        return array_unique($featureIds);
    }

    private function importImages(Venue $venue, array $imageUrls): void
    {
        $first = true;

        foreach ($imageUrls as $imageUrl) {
            if ($imageUrl === '') {
                continue;
            }

            try {
                $filename = $this->safeFilename($imageUrl);
                $collection = $first ? 'venue-cover' : 'venue-gallery';

                $venue->addMediaFromUrl($imageUrl)
                    ->usingFileName($filename)
                    ->toMediaCollection($collection);

                $first = false;
            } catch (\Throwable $exception) {
                $this->command?->warn("Image import failed for {$imageUrl}: {$exception->getMessage()}");
            }
        }
    }

    private function safeFilename(string $url): string
    {
        $name = rawurldecode(pathinfo(parse_url($url, PHP_URL_PATH) ?: basename($url), PATHINFO_BASENAME));
        $name = preg_replace('/[^A-Za-z0-9\-_.]+/', '-', $name);
        return trim($name, '-_');
    }
}
