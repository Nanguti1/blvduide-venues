<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Venue;
use App\Models\VenueCategory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FavoriteController extends Controller
{
    public function index(Request $request)
    {
        $filters = $request->only(['q', 'category', 'location', 'featured']);

        $favorites = $request->user()
            ->favoriteVenues()
            ->with(['category', 'country', 'city', 'locale'])
            ->when($filters['q'] ?? null, fn ($q, string $term) => $q->where('title', 'like', '%'.$term.'%'))
            ->when($filters['category'] ?? null, fn ($q, string $category) => $q->whereHas('category', fn (Builder $cat) => $cat->where('slug', $category)))
            ->when(isset($filters['featured']) && $filters['featured'] !== '', fn ($q) => $q->where('featured', $filters['featured'] === '1'))
            ->when($filters['location'] ?? null, function ($q, string $location): void {
                $q->where(function ($query) use ($location): void {
                    $query->whereHas('country', fn (Builder $country) => $country->where('name', 'like', '%'.$location.'%'))
                        ->orWhereHas('city', fn (Builder $city) => $city->where('name', 'like', '%'.$location.'%'))
                        ->orWhereHas('locale', fn (Builder $locale) => $locale->where('name', 'like', '%'.$location.'%'));
                });
            })
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('dashboard/favorites/index', [
            'favorites' => $favorites,
            'filters' => $filters,
            'categories' => VenueCategory::orderBy('name')->get(['name', 'slug']),
        ]);
    }

    public function toggle(Request $request, Venue $venue)
    {
        $user = $request->user();

        if ($user->favoriteVenues()->where('venue_id', $venue->id)->exists()) {
            $user->favoriteVenues()->detach($venue->id);

            return back()->with('success', 'Venue removed from favorites.');
        }

        $user->favoriteVenues()->attach($venue->id);

        return back()->with('success', 'Venue added to favorites.');
    }
}
