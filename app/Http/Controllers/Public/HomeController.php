<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Venue;
use App\Models\VenueCategory;
use Illuminate\Support\Collection;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function __invoke()
    {
        return Inertia::render('home', [
            'featuredVenues' => Venue::published()
                ->featured()
                ->with(['category', 'city', 'locale', 'media'])
                ->latest('published_at')
                ->limit(6)
                ->get(),
            'latestVenues' => Venue::published()
                ->with(['category', 'city', 'locale', 'media'])
                ->latest('published_at')
                ->limit(8)
                ->get(),
            'categories' => $this->homepageCategories(),
        ]);
    }

    protected function homepageCategories(): Collection
    {
        return $this->curatedCategories([
            'wedding-venues' => 'Wedding Venues',
            'gardens' => 'Gardens',
            'meeting-rooms' => 'Board rooms | Meeting rooms',
            'coworking-spaces' => 'Co working',
        ]);
    }

    protected function curatedCategories(array $labels): Collection
    {
        return VenueCategory::query()
            ->whereIn('slug', array_keys($labels))
            ->get(['id', 'name', 'slug', 'icon'])
            ->sortBy(fn (VenueCategory $category) => array_search($category->slug, array_keys($labels), true))
            ->values()
            ->map(function (VenueCategory $category) use ($labels) {
                $category->name = $labels[$category->slug] ?? $category->name;

                return $category;
            });
    }
}
