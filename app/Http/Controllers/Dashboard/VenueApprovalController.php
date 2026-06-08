<?php

namespace App\Http\Controllers\Dashboard;

use App\Enums\VenueApprovalStatus;
use App\Http\Controllers\Controller;
use App\Models\Venue;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VenueApprovalController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('approve', Venue::class);

        $filters = $request->only(['q', 'status', 'owner']);

        $venues = Venue::query()
            ->whereIn('approval_status', [
                VenueApprovalStatus::Pending->value,
                VenueApprovalStatus::Rejected->value,
            ])
            ->with(['category', 'user', 'country', 'city'])
            ->when($filters['q'] ?? null, fn ($q, string $term) => $q->where('title', 'like', '%'.$term.'%'))
            ->when($filters['status'] ?? null, fn ($q, string $status) => $q->where('approval_status', $status))
            ->when($filters['owner'] ?? null, fn ($q, string $owner) => $q->whereHas('user', fn (Builder $user) => $user->where('name', 'like', '%'.$owner.'%')->orWhere('email', 'like', '%'.$owner.'%')))
            ->latest()
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('dashboard/approvals/index', [
            'venues' => $venues,
            'filters' => $filters,
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
