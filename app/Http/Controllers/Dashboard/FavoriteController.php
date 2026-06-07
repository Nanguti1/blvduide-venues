<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Venue;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FavoriteController extends Controller
{
    public function index(Request $request)
    {
        $favorites = $request->user()
            ->favoriteVenues()
            ->with(['category', 'country', 'city', 'locale'])
            ->paginate(20);

        return Inertia::render('dashboard/favorites/index', [
            'favorites' => $favorites,
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
