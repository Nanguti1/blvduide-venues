<?php

namespace App\Services\Search;

use App\Models\Venue;
use Illuminate\Database\Eloquent\Builder;

class VenueSearchService
{
    public function query(array $filters = []): Builder
    {
        $query = Venue::query()
            ->with(['category', 'features'])
            ->withAvg(['reviews' => fn ($builder) => $builder->approved()], 'rating')
            ->where('approval_status', 'published')
            ->where('published_at', '<=', now());

        return $query
            ->when($filters['q'] ?? null, fn (Builder $q, string $term) => $q->whereFullText(['title', 'description'], $term))
            ->when($filters['category'] ?? null, fn (Builder $q, string $category) => $q->whereHas('category', fn (Builder $c) => $c->where('slug', $category)))
            ->when($filters['country'] ?? null, fn (Builder $q, string $country) => $q->whereHas('country', fn (Builder $c) => $c->where('slug', $country)))
            ->when($filters['county'] ?? null, fn (Builder $q, string $county) => $q->whereHas('county', fn (Builder $c) => $c->where('slug', $county)))
            ->when($filters['city'] ?? null, fn (Builder $q, string $city) => $q->whereHas('city', fn (Builder $c) => $c->where('slug', $city)))
            ->when($filters['locale'] ?? null, fn (Builder $q, string $locale) => $q->whereHas('locale', fn (Builder $c) => $c->where('slug', $locale)))
            ->when($filters['featured'] ?? null, fn (Builder $q) => $q->where('featured', true))
            ->when($filters['min_price'] ?? null, fn (Builder $q, $min) => $q->where('price', '>=', $min))
            ->when($filters['max_price'] ?? null, fn (Builder $q, $max) => $q->where('price', '<=', $max))
            ->when($filters['capacity'] ?? null, fn (Builder $q, $capacity) => $q->where('capacity', '>=', $capacity))
            ->when($filters['features'] ?? null, fn (Builder $q, $features) => $q->whereHas('features', fn (Builder $query) => $query->whereIn('venue_features.id', (array) $features)))
            ->when($filters['min_rating'] ?? null, fn (Builder $q, $rating) => $q->whereHas('reviews', fn (Builder $query) => $query->approved()->where('rating', '>=', $rating)))
            ->when(isset($filters['bounds_north']) && isset($filters['bounds_south']) && isset($filters['bounds_east']) && isset($filters['bounds_west']), 
                fn (Builder $q) => $q
                    ->whereBetween('latitude', [$filters['bounds_south'], $filters['bounds_north']])
                    ->whereBetween('longitude', [$filters['bounds_west'], $filters['bounds_east']])
            );
    }

    /**
     * Search for venues within a specified radius of a coordinate
     * Uses Haversine formula for distance calculation
     */
    public function searchNearby(float $latitude, float $longitude, float $radiusKm, array $filters = []): Builder
    {
        $query = Venue::query()
            ->with(['category', 'features'])
            ->withAvg(['reviews' => fn ($builder) => $builder->approved()], 'rating')
            ->where('approval_status', 'published')
            ->where('published_at', '<=', now())
            ->whereNotNull('latitude')
            ->whereNotNull('longitude');

        // Apply Haversine formula for distance calculation
        $query->selectRaw("*,
            (6371 * acos(cos(radians(?)) * cos(radians(latitude)) 
            * cos(radians(longitude) - radians(?)) + sin(radians(?)) 
            * sin(radians(latitude)))) AS distance", [$latitude, $longitude, $latitude])
            ->having('distance', '<=', $radiusKm)
            ->orderBy('distance');

        // Apply additional filters
        return $query
            ->when($filters['category'] ?? null, fn (Builder $q, string $category) => $q->whereHas('category', fn (Builder $c) => $c->where('slug', $category)))
            ->when($filters['featured'] ?? null, fn (Builder $q) => $q->where('featured', true))
            ->when($filters['min_price'] ?? null, fn (Builder $q, $min) => $q->where('price', '>=', $min))
            ->when($filters['max_price'] ?? null, fn (Builder $q, $max) => $q->where('price', '<=', $max))
            ->when($filters['min_rating'] ?? null, fn (Builder $q, $rating) => $q->whereHas('reviews', fn (Builder $query) => $query->approved()->where('rating', '>=', $rating)));
    }
}
