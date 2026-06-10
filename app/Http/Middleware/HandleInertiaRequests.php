<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => fn () => $this->authUser($request),
            ],
            'navCategories' => fn () => $this->navCategories(),
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
                'toast' => fn () => $request->session()->get('toast')
                    ?? ($request->session()->get('success') ? ['type' => 'success', 'message' => $request->session()->get('success')] : null)
                    ?? ($request->session()->get('error') ? ['type' => 'error', 'message' => $request->session()->get('error')] : null),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }

    protected function navCategories(): \Illuminate\Support\Collection
    {
        $labels = [
            'wedding-venues' => 'Wedding Venues',
            'gardens' => 'Gardens',
            'meeting-rooms' => 'Board rooms | Meeting rooms',
            'coworking-spaces' => 'Co working',
            'conference-halls' => 'Conference Halls',
            'serviced-offices' => 'Serviced Offices',
            'studio-venues' => 'Studio Venues',
        ];

        return \App\Models\VenueCategory::query()
            ->whereIn('slug', array_keys($labels))
            ->get(['id', 'name', 'slug', 'icon'])
            ->sortBy(fn (\App\Models\VenueCategory $category) => array_search($category->slug, array_keys($labels), true))
            ->values()
            ->map(function (\App\Models\VenueCategory $category) use ($labels) {
                $category->name = $labels[$category->slug] ?? $category->name;

                return $category;
            });
    }

    protected function authUser(Request $request): ?array
    {
        $user = $request->user();

        if (! $user) {
            return null;
        }

        return array_merge($user->toArray(), [
            'roles' => $user->getRoleNames(),
            'permissions' => $user->getAllPermissions()->pluck('name'),
        ]);
    }
}
