<?php

namespace App\Services\Search;

use App\Models\Venue;
use Illuminate\Database\Eloquent\Builder;

class VenueSearchService
{
    public function query(array $filters = []): Builder
    {
        return Venue::query()
            ->with(['category', 'features'])
            ->when($filters['q'] ?? null, fn (Builder $q, string $term) => $q->whereFullText(['title', 'description'], $term))
            ->when($filters['category'] ?? null, fn (Builder $q, string $category) => $q->whereHas('category', fn (Builder $c) => $c->where('slug', $category)))
            ->when($filters['featured'] ?? null, fn (Builder $q) => $q->where('featured', true))
            ->when($filters['min_price'] ?? null, fn (Builder $q, $min) => $q->where('price', '>=', $min))
            ->when($filters['max_price'] ?? null, fn (Builder $q, $max) => $q->where('price', '<=', $max))
            ->where('approval_status', 'published');
    }
}
