<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Venue;
use App\Models\VenueCategory;
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
            'categories' => VenueCategory::orderBy('name')->get(),
        ]);
    }
}
