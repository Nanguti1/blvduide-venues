<?php

namespace App\Http\Controllers;

use App\Enums\VenueApprovalStatus;
use App\Models\Venue;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke(Request $request)
    {
        $user = $request->user();

        return Inertia::render('dashboard', [
            'stats' => [
                'listings' => $user->venues()->count(),
                'pending' => $user->venues()->where('approval_status', VenueApprovalStatus::Pending)->count(),
                'favorites' => $user->favoriteVenues()->count(),
                'subscription' => $user->activeSubscription()?->package?->name ?? 'None',
            ],
        ]);
    }
}
