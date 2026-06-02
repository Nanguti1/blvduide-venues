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
            ->when($filters['min_rating'] ?? null, fn (Builder $q, $rating) => $q->whereHas('reviews', fn (Builder $query) => $query->approved()->where('rating', '>=', $rating)));
    }
}
