<?php

namespace App\Http\Controllers\Agent;

use App\Actions\Venues\UpsertVenueAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\Venue\StoreVenueRequest;
use App\Http\Requests\Venue\UpdateVenueRequest;
use App\Models\Venue;
use App\Models\VenueCategory;
use App\Models\VenueFeature;
use App\Services\Subscriptions\SubscriptionGateService;
use Inertia\Inertia;
use Inertia\Response;

class VenueController extends Controller
{
    public function index(): Response
    {
        $venues = auth()->user()->venues()->with('category')->latest()->paginate(10);

        return Inertia::render('agent/venues/index', [
            'venues' => $venues,
        ]);
    }

    public function create(SubscriptionGateService $gate): Response
    {
        abort_unless($gate->canCreateVenue(auth()->user()), 403, 'Active subscription required or limit reached.');

        return Inertia::render('agent/venues/create', [
            'categories' => VenueCategory::query()->orderBy('name')->get(['id', 'name']),
            'features' => VenueFeature::query()->orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(StoreVenueRequest $request, UpsertVenueAction $action)
    {
        $action->execute([...$request->validated(), 'user_id' => $request->user()->id]);

        return redirect()->route('agent.venues.index')->with('success', 'Venue created and submitted for approval.');
    }

    public function edit(Venue $venue): Response
    {
        $this->authorize('update', $venue);

        return Inertia::render('agent/venues/edit', [
            'venue' => $venue->load('features:id'),
            'categories' => VenueCategory::query()->orderBy('name')->get(['id', 'name']),
            'features' => VenueFeature::query()->orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function update(UpdateVenueRequest $request, Venue $venue, UpsertVenueAction $action)
    {
        $this->authorize('update', $venue);
        $action->execute($request->validated(), $venue);

        return redirect()->route('agent.venues.index')->with('success', 'Venue updated and resubmitted for approval.');
    }
}
