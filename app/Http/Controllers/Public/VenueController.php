<?php

namespace App\Http\Controllers\Public;

use App\Enums\VenueApprovalStatus;
use App\Http\Controllers\Controller;
use App\Models\Country;
use App\Models\Venue;
use App\Models\VenueCategory;
use App\Models\VenueFeature;
use App\Models\Locale;
use App\Services\Search\VenueSearchService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VenueController extends Controller
{
    public function index(Request $request, VenueSearchService $search)
    {
        $filters = $request->only([
            'q',
            'category',
            'country',
            'county',
            'city',
            'locale',
            'min_price',
            'max_price',
            'capacity',
            'features',
            'featured',
            'min_rating',
        ]);

        $venues = $search->query($filters)
            ->with(['category', 'features', 'country', 'county', 'city', 'locale', 'user', 'media'])
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('venues/index', [
            'venues' => $venues,
            'filters' => $filters,
            'categories' => VenueCategory::orderBy('name')->get(),
            'features' => VenueFeature::orderBy('name')->get(),
            'countries' => Country::with(['counties.cities.locales'])->orderBy('name')->get(),
        ]);
    }

    public function show(Venue $venue, Request $request)
    {
        abort_if($venue->approval_status !== VenueApprovalStatus::Published, 404);

        $user = $request->user();
        
        // Load media explicitly
        $venue->load('media');

        return Inertia::render('venues/show', [
            'venue' => $venue->load(['category', 'features', 'country', 'county', 'city', 'locale', 'user']),
            'approvedReviews' => $venue->reviews()->approved()->with('user')->latest()->get(),
            'pendingReviews' => $user ? $user->reviews()->where('venue_id', $venue->id)->pending()->with('user')->latest()->get() : [],
            'isFavorited' => $user
                ? $user->favoriteVenues()->where('venue_id', $venue->id)->exists()
                : false,
            'related' => Venue::published()
                ->where('venue_category_id', $venue->venue_category_id)
                ->where('id', '!=', $venue->id)
                ->limit(4)
                ->get(),
        ]);
    }
    
        public function category(VenueCategory $category, Request $request, VenueSearchService $search)
        {
            $filters = array_merge($request->only(['q', 'country', 'county', 'city', 'locale', 'min_price', 'max_price', 'capacity', 'features', 'featured', 'min_rating']), ['category' => $category->slug]);
        
            $venues = $search->query($filters)
                ->with(['category', 'features', 'country', 'county', 'city', 'locale', 'user', 'media'])
                ->paginate(12)
                ->withQueryString();

            return Inertia::render('venues/index', [
                'venues' => $venues,
                'filters' => $filters,
                'category' => $category,
                'categories' => VenueCategory::orderBy('name')->get(),
                'features' => VenueFeature::orderBy('name')->get(),
                'countries' => Country::with(['counties.cities.locales'])->orderBy('name')->get(),
            ]);
        }
    
        public function locale(Locale $locale, Request $request, VenueSearchService $search)
        {
            $filters = array_merge($request->only(['q', 'category', 'country', 'county', 'city', 'min_price', 'max_price', 'capacity', 'features', 'featured', 'min_rating']), ['locale' => $locale->slug]);
        
            $venues = $search->query($filters)
                ->with(['category', 'features', 'country', 'county', 'city', 'locale', 'user', 'media'])
                ->paginate(12)
                ->withQueryString();

            return Inertia::render('venues/index', [
                'venues' => $venues,
                'filters' => $filters,
                'locale' => $locale,
                'categories' => VenueCategory::orderBy('name')->get(),
                'features' => VenueFeature::orderBy('name')->get(),
                'countries' => Country::with(['counties.cities.locales'])->orderBy('name')->get(),
            ]);
        }
}
