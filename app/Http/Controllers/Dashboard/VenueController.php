<?php

namespace App\Http\Controllers\Dashboard;

use App\Enums\VenueApprovalStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreVenueRequest;
use App\Http\Requests\UpdateVenueRequest;
use App\Models\Country;
use App\Models\Venue;
use App\Models\VenueCategory;
use App\Models\VenueFeature;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class VenueController extends Controller
{
    public function index(Request $request)
    {
        $venues = $request->user()
            ->venues()
            ->with(['category', 'country', 'county', 'city', 'locale'])
            ->latest()
            ->paginate(12);

        return Inertia::render('dashboard/venues/index', [
            'venues' => $venues,
        ]);
    }

    public function create(Request $request)
    {
        return Inertia::render('dashboard/venues/create', [
            'categories' => VenueCategory::orderBy('name')->get(),
            'features' => VenueFeature::orderBy('name')->get(),
            'countries' => Country::with(['counties.cities.locales'])->orderBy('name')->get(),
            'subscription' => $request->user()->activeSubscription()?->load('package'),
        ]);
    }

    public function store(StoreVenueRequest $request)
    {
        $user = $request->user();

        $subscription = $user->activeSubscription();

        abort_unless($subscription, 403, 'An active subscription is required to create a venue.');

        if ($user->venues()->count() >= $subscription->package->max_listings) {
            return back()->with('error', 'Your current package listing allowance has been reached.');
        }

        $attributes = $request->validated();
        $attributes['user_id'] = $user->id;
        $attributes['slug'] = $attributes['slug'] ?? Str::slug($attributes['title']);
        $attributes['approval_status'] = $request->boolean('submit_for_approval')
            ? VenueApprovalStatus::Pending->value
            : VenueApprovalStatus::Draft->value;

        $venue = Venue::create($attributes);
        $venue->features()->sync($attributes['features'] ?? []);
        $this->syncMedia($venue, $request);

        return redirect()->route('dashboard.venues.index')->with('success', 'Venue created successfully and is ready for review.');
    }

    public function edit(Venue $venue)
    {
        $this->authorize('update', $venue);

        return Inertia::render('dashboard/venues/edit', [
            'venue' => $venue->load(['features', 'country', 'county', 'city', 'locale']),
            'categories' => VenueCategory::orderBy('name')->get(),
            'features' => VenueFeature::orderBy('name')->get(),
            'countries' => Country::with(['counties.cities.locales'])->orderBy('name')->get(),
        ]);
    }

    public function update(UpdateVenueRequest $request, Venue $venue)
    {
        $this->authorize('update', $venue);

        $attributes = $request->validated();
        $attributes['slug'] = $attributes['slug'] ?? Str::slug($attributes['title']);

        $venue->update($attributes);
        $venue->features()->sync($attributes['features'] ?? []);
        $this->syncMedia($venue, $request);

        return redirect()->route('dashboard.venues.index')->with('success', 'Venue updated successfully.');
    }

    public function destroy(Venue $venue)
    {
        $this->authorize('delete', $venue);

        $venue->delete();

        return redirect()->route('dashboard.venues.index')->with('success', 'Venue deleted successfully.');
    }

    public function submitForApproval(Venue $venue)
    {
        $this->authorize('update', $venue);

        $venue->update([
            'approval_status' => VenueApprovalStatus::Pending->value,
            'published_at' => now(),
        ]);

        return redirect()->route('dashboard.venues.index')->with('success', 'Venue submitted for approval.');
    }

    protected function syncMedia(Venue $venue, Request $request): void
    {
        if ($request->hasFile('cover')) {
            $venue->addMediaFromRequest('cover')->toMediaCollection('venue-cover');
        }

        if ($request->hasFile('gallery')) {
            foreach ($request->file('gallery') as $file) {
                $venue->addMedia($file)->toMediaCollection('venue-gallery');
            }
        }
    }
}
