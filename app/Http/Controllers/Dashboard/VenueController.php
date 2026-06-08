<?php

namespace App\Http\Controllers\Dashboard;

use App\Enums\VenueApprovalStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreVenueRequest;
use App\Http\Requests\UpdateVenueRequest;
use App\Models\City;
use App\Models\Country;
use App\Models\County;
use App\Models\Locale;
use App\Models\Venue;
use App\Models\VenueCategory;
use App\Models\VenueFeature;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class VenueController extends Controller
{
    public function index(Request $request)
    {
        $query = $request->user()->hasRole('Super Admin')
            ? Venue::query()
            : $request->user()->venues();

        $filters = $request->only(['q', 'featured', 'category', 'location', 'status']);

        $venues = $query
            ->with(['category', 'country', 'county', 'city', 'locale'])
            ->when($filters['q'] ?? null, fn ($q, string $term) => $q->where('title', 'like', '%'.$term.'%'))
            ->when(isset($filters['featured']) && $filters['featured'] !== '', fn ($q) => $q->where('featured', $filters['featured'] === '1'))
            ->when($filters['category'] ?? null, fn ($q, string $category) => $q->where('venue_category_id', $category))
            ->when($filters['location'] ?? null, function ($q, string $location): void {
                $q->where(function ($query) use ($location): void {
                    $query->whereHas('country', fn (Builder $country) => $country->where('name', 'like', '%'.$location.'%'))
                        ->orWhereHas('county', fn (Builder $county) => $county->where('name', 'like', '%'.$location.'%'))
                        ->orWhereHas('city', fn (Builder $city) => $city->where('name', 'like', '%'.$location.'%'))
                        ->orWhereHas('locale', fn (Builder $locale) => $locale->where('name', 'like', '%'.$location.'%'));
                });
            })
            ->when($filters['status'] ?? null, fn ($q, string $status) => $q->where('approval_status', $status))
            ->latest()
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('dashboard/venues/index', [
            'venues' => $venues,
            'filters' => $filters,
            'categories' => VenueCategory::orderBy('name')->get(['id', 'name']),
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

        if (! $subscription && ! $user->hasRole('Super Admin')) {
            abort(403, 'An active subscription is required to create a venue.');
        }

        if ($subscription && $user->venues()->count() >= $subscription->package->max_listings) {
            return back()->with('error', 'Your current package listing allowance has been reached.');
        }

        $attributes = $request->validated();
        $attributes = array_merge($attributes, $this->resolveLocationIds($attributes));
        unset($attributes['country_name'], $attributes['county_name'], $attributes['city_name'], $attributes['locale_name']);

        if (! $user->hasRole('Super Admin')) {
            unset($attributes['featured']);
        }

        $attributes['user_id'] = $user->id;
        $attributes['slug'] = $attributes['slug'] ?? Str::slug($attributes['title']);

        if ($request->boolean('publish_directly') && $user->hasRole('Super Admin')) {
            $attributes['approval_status'] = VenueApprovalStatus::Published->value;
            $attributes['published_at'] = now();
        } else {
            $attributes['approval_status'] = $request->boolean('submit_for_approval')
                ? VenueApprovalStatus::Pending->value
                : VenueApprovalStatus::Draft->value;
        }

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
        $attributes = array_merge($attributes, $this->resolveLocationIds($attributes));
        unset($attributes['country_name'], $attributes['county_name'], $attributes['city_name'], $attributes['locale_name']);

        $attributes['slug'] = $attributes['slug'] ?? Str::slug($attributes['title']);

        if (! $request->user()->hasRole('Super Admin')) {
            unset($attributes['featured']);
        }

        if ($request->boolean('publish_directly') && $request->user()->hasRole('Super Admin')) {
            $attributes['approval_status'] = VenueApprovalStatus::Published->value;
            $attributes['published_at'] = now();
        }

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

    public function bulkDestroy(Request $request)
    {
        $attributes = $request->validate([
            'venue_ids' => ['required', 'array', 'min:1'],
            'venue_ids.*' => ['integer', 'exists:venues,id'],
        ]);

        $venues = Venue::query()
            ->whereIn('id', $attributes['venue_ids'])
            ->get();

        $venues->each(function (Venue $venue) {
            $this->authorize('delete', $venue);
            $venue->delete();
        });

        return redirect()->route('dashboard.venues.index')->with('success', $venues->count().' venues deleted successfully.');
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

    protected function resolveLocationIds(array $data): array
    {
        $countryId = $data['country_id'] ?? null;
        if (filled($data['country_name'])) {
            $country = Country::firstOrCreate(
                ['slug' => Str::slug($data['country_name'])],
                ['name' => trim($data['country_name'])]
            );
            $countryId = $country->id;
        }

        $countyId = $data['county_id'] ?? null;
        if (filled($data['county_name'])) {
            $county = County::firstOrCreate(
                [
                    'country_id' => $countryId,
                    'slug' => Str::slug($data['county_name']),
                ],
                ['name' => trim($data['county_name'])],
            );
            $countyId = $county->id;
        }

        $cityId = $data['city_id'] ?? null;
        if (filled($data['city_name'])) {
            $city = City::firstOrCreate(
                [
                    'county_id' => $countyId,
                    'slug' => Str::slug($data['city_name']),
                ],
                ['name' => trim($data['city_name'])],
            );
            $cityId = $city->id;
        }

        $localeId = $data['locale_id'] ?? null;
        if (filled($data['locale_name'])) {
            $locale = Locale::firstOrCreate(
                [
                    'city_id' => $cityId,
                    'slug' => Str::slug($data['locale_name']),
                ],
                ['name' => trim($data['locale_name'])],
            );
            $localeId = $locale->id;
        }

        return [
            'country_id' => $countryId,
            'county_id' => $countyId,
            'city_id' => $cityId,
            'locale_id' => $localeId,
        ];
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
