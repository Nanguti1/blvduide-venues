<?php

namespace App\Http\Controllers\Dashboard;

use App\Enums\VenueApprovalStatus;
use App\Http\Controllers\Controller;
use App\Models\Venue;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VenueApprovalController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('approve', Venue::class);

        $venues = Venue::query()
            ->whereIn('approval_status', [
                VenueApprovalStatus::Pending->value,
                VenueApprovalStatus::Rejected->value,
            ])
            ->with(['category', 'user', 'country', 'city'])
            ->latest()
            ->paginate(15);

        return Inertia::render('dashboard/approvals/index', [
            'venues' => $venues,
        ]);
    }

    public function approve(Venue $venue)
    {
        $this->authorize('approve', Venue::class);

        $venue->update([
            'approval_status' => VenueApprovalStatus::Published->value,
            'published_at' => now(),
        ]);

        return back()->with('success', 'Venue approved and published.');
    }

    public function reject(Venue $venue, Request $request)
    {
        $this->authorize('approve', Venue::class);

        $venue->update([
            'approval_status' => VenueApprovalStatus::Rejected->value,
            'published_at' => null,
        ]);

        return back()->with('success', 'Venue rejected.');
    }
}
