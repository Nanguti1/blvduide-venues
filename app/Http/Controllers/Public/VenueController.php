<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Venue;
use App\Services\Search\VenueSearchService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class VenueController extends Controller
{
    public function index(Request $request, VenueSearchService $search): Response
    {
        $venues = $search->query($request->all())
            ->latest('published_at')
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('public/venues/index', [
            'venues' => $venues,
            'filters' => $request->only(['q', 'category', 'featured', 'min_price', 'max_price']),
        ]);
    }

    public function show(Venue $venue): Response
    {
        abort_unless($venue->approval_status->value === 'published', 404);

        return Inertia::render('public/venues/show', [
            'venue' => $venue->load(['category', 'features', 'reviews.user:id,name']),
        ]);
    }
}
