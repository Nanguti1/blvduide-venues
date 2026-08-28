import { Head, Link, router } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { useState } from 'react';
import VenueCard from '@/components/venue-card';
import VenuesMapView from '@/components/venue/venues-map-view';
import venues from '@/routes/venues';
import { getCurrentLocation } from '@/lib/geolocation';

type Props = {
    filters: Record<string, string | string[] | undefined>;
    categories: Array<{ id: number; name: string; slug: string }>;
    features: Array<{ id: number; name: string; slug: string }>;
    countries: Array<any>;
    venues: any;
    category?: { name: string; slug: string };
    locale?: { name: string; slug: string };
};

export default function VenueFilters({
    filters,
    categories,
    features,
    countries,
    venues: venueList,
    category,
    locale,
}: Props) {
    const [displayedVenues, setDisplayedVenues] = useState<any[]>(
        venueList.data ?? [],
    );
    const [loadingMore, setLoadingMore] = useState(false);
    const [pagination, setPagination] = useState(venueList);
    const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
    const [gettingLocation, setGettingLocation] = useState(false);
    const [mapBounds, setMapBounds] = useState<{ north: number; south: number; east: number; west: number } | null>(null);
    const [localFilters, setLocalFilters] = useState({
        q: (filters.q as string) ?? '',
        category: (filters.category as string) ?? category?.slug ?? '',
        country: (filters.country as string) ?? '',
        county: (filters.county as string) ?? '',
        city: (filters.city as string) ?? '',
        locale: (filters.locale as string) ?? locale?.slug ?? '',
        min_price: (filters.min_price as string) ?? '',
        max_price: (filters.max_price as string) ?? '',
        capacity: (filters.capacity as string) ?? '',
        featured:
            filters.featured === '1' || String(filters.featured) === 'true',
        min_rating: (filters.min_rating as string) ?? '',
        features: Array.isArray(filters.features)
            ? filters.features.map(String)
            : filters.features
              ? [String(filters.features)]
              : [],
    });

    function applyFilters(e?: FormEvent) {
        e?.preventDefault();

        const query: Record<string, string | string[]> = {};

        Object.entries(localFilters).forEach(([key, value]) => {
            if (key === 'featured') {
                if (value) {
                    query.featured = '1';
                }

                return;
            }

            if (key === 'features' && Array.isArray(value) && value.length) {
                query.features = value;

                return;
            }

            if (value !== '' && value !== false && value !== null) {
                query[key] = String(value);
            }
        });

        router.get(venues.index.url(), query, { preserveScroll: true });
    }

    async function loadMore() {
        if (!pagination.next_page_url) {
            return;
        }

        setLoadingMore(true);

        try {
            const response = await fetch(pagination.next_page_url, {
                headers: { Accept: 'application/json' },
            });
            const payload = await response.json();

            setPagination(payload.venues);
            setDisplayedVenues((current) => {
                const next = [...current];

                (payload.venues?.data ?? []).forEach((venue: any) => {
                    if (!next.some((item) => item.id === venue.id)) {
                        next.push(venue);
                    }
                });

                return next;
            });
        } finally {
            setLoadingMore(false);
        }
    }

    async function handleNearMeSearch() {
        setGettingLocation(true);
        try {
            const location = await getCurrentLocation();
            
            // Add location to filters
            const updatedFilters = {
                ...localFilters,
                latitude: location.latitude.toString(),
                longitude: location.longitude.toString(),
                radius: '10', // Default 10km radius
            };

            setLocalFilters(updatedFilters);
            
            // Trigger search with location
            const query: Record<string, string | string[]> = {};
            Object.entries(updatedFilters).forEach(([key, value]) => {
                if (value !== '' && value !== false && value !== null) {
                    query[key] = String(value);
                }
            });

            router.get(venues.index.url(), query, { preserveScroll: true });
        } catch (error) {
            console.error('Location error:', error);
            alert('Could not get your location. Please enable location access.');
        } finally {
            setGettingLocation(false);
        }
    }

    function handleBoundsChange(bounds: { north: number; south: number; east: number; west: number }) {
        setMapBounds(bounds);
    }

    function handleSearchInBounds() {
        if (!mapBounds) return;

        const updatedFilters = {
            ...localFilters,
            bounds_north: mapBounds.north.toString(),
            bounds_south: mapBounds.south.toString(),
            bounds_east: mapBounds.east.toString(),
            bounds_west: mapBounds.west.toString(),
        };

        setLocalFilters(updatedFilters);

        const query: Record<string, string | string[]> = {};
        Object.entries(updatedFilters).forEach(([key, value]) => {
            if (value !== '' && value !== false && value !== null) {
                query[key] = String(value);
            }
        });

        router.get(venues.index.url(), query, { preserveScroll: true });
    }

    return (
        <>
            <Head title={category?.name ?? locale?.name ?? 'Discover Venues'} />
            <div className="max-w-8xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
                <header className="mb-8">
                    <p className="text-sm tracking-[0.24em] text-slate-500 uppercase">
                        Venue marketplace
                    </p>
                    <h1 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">
                        {category?.name ??
                            locale?.name ??
                            'Discover spaces for every event'}
                    </h1>
                </header>

                <form
                    onSubmit={applyFilters}
                    className="mb-8 grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-4 dark:border-slate-700 dark:bg-slate-900"
                >
                    <input
                        placeholder="Search venues..."
                        value={localFilters.q}
                        onChange={(e) =>
                            setLocalFilters({
                                ...localFilters,
                                q: e.target.value,
                            })
                        }
                        className="rounded-2xl border border-slate-200 px-4 py-3 text-sm md:col-span-2 dark:border-slate-700 dark:bg-slate-950"
                    />
                    <select
                        value={localFilters.category}
                        onChange={(e) =>
                            setLocalFilters({
                                ...localFilters,
                                category: e.target.value,
                            })
                        }
                        className="rounded-2xl border border-slate-200 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950"
                    >
                        <option value="">All categories</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.slug}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    <select
                        value={localFilters.locale}
                        onChange={(e) =>
                            setLocalFilters({
                                ...localFilters,
                                locale: e.target.value,
                            })
                        }
                        className="rounded-2xl border border-slate-200 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950"
                    >
                        <option value="">All areas</option>
                        {countries.flatMap((country) =>
                            (country.counties ?? []).flatMap((county: any) =>
                                (county.cities ?? []).flatMap((city: any) =>
                                    (city.locales ?? []).map((loc: any) => (
                                        <option key={loc.id} value={loc.slug}>
                                            {loc.name}
                                        </option>
                                    )),
                                ),
                            ),
                        )}
                    </select>
                    <input
                        type="number"
                        placeholder="Min price"
                        value={localFilters.min_price}
                        onChange={(e) =>
                            setLocalFilters({
                                ...localFilters,
                                min_price: e.target.value,
                            })
                        }
                        className="rounded-2xl border border-slate-200 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950"
                    />
                    <input
                        type="number"
                        placeholder="Max price"
                        value={localFilters.max_price}
                        onChange={(e) =>
                            setLocalFilters({
                                ...localFilters,
                                max_price: e.target.value,
                            })
                        }
                        className="rounded-2xl border border-slate-200 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950"
                    />
                    <input
                        type="number"
                        placeholder="Min capacity"
                        value={localFilters.capacity}
                        onChange={(e) =>
                            setLocalFilters({
                                ...localFilters,
                                capacity: e.target.value,
                            })
                        }
                        className="rounded-2xl border border-slate-200 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950"
                    />
                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            checked={localFilters.featured}
                            onChange={(e) =>
                                setLocalFilters({
                                    ...localFilters,
                                    featured: e.target.checked,
                                })
                            }
                        />
                        Featured only
                    </label>
                    <button
                        type="submit"
                        className="rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 md:col-span-2"
                    >
                        Apply filters
                    </button>
                </form>

                {/* View Mode Toggle */}
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setViewMode('list')}
                            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
                                viewMode === 'list'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                            }`}
                        >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                            </svg>
                            List View
                        </button>
                        <button
                            type="button"
                            onClick={() => setViewMode('map')}
                            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
                                viewMode === 'map'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                            }`}
                        >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                            </svg>
                            Map View
                        </button>
                        <button
                            type="button"
                            onClick={handleNearMeSearch}
                            disabled={gettingLocation}
                            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
                                gettingLocation
                                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                    : 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800'
                            }`}
                        >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {gettingLocation ? 'Getting Location...' : 'Near Me'}
                        </button>
                        {viewMode === 'map' && (
                            <button
                                type="button"
                                onClick={handleSearchInBounds}
                                disabled={!mapBounds}
                                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
                                    !mapBounds
                                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800'
                                }`}
                            >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                Search this area
                            </button>
                        )}
                    </div>
                    <p className="text-sm text-slate-500">
                        {displayedVenues.length} venues found
                    </p>
                </div>

                {viewMode === 'list' && (
                    <div className="mb-6 flex flex-wrap gap-2">
                        {features.slice(0, 8).map((feature) => {
                            const active = localFilters.features.includes(
                                String(feature.id),
                            );

                            return (
                                <button
                                    key={feature.id}
                                    type="button"
                                    onClick={() => {
                                        const next = active
                                            ? localFilters.features.filter(
                                                  (id) => id !== String(feature.id),
                                              )
                                            : [
                                                  ...localFilters.features,
                                                  String(feature.id),
                                              ];
                                        setLocalFilters({
                                            ...localFilters,
                                            features: next,
                                        });
                                    }}
                                    className={`rounded-full px-3 py-1 text-sm ${
                                        active
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                                    }`}
                                >
                                    {feature.name}
                                </button>
                            );
                        })}
                    </div>
                )}

                {displayedVenues.length ? (
                    <>
                        {viewMode === 'list' ? (
                            <>
                                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                    {displayedVenues.map((venue: any) => (
                                        <VenueCard key={venue.id} venue={venue} />
                                    ))}
                                </div>
                                {pagination.next_page_url ? (
                                    <div className="mt-10 flex justify-center">
                                        <button
                                            type="button"
                                            onClick={loadMore}
                                            disabled={loadingMore}
                                            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            {loadingMore ? 'Loading…' : 'Load More'}
                                        </button>
                                    </div>
                                ) : null}
                            </>
                        ) : (
                            <VenuesMapView 
                                venues={displayedVenues} 
                                className="map-container-lg"
                                onBoundsChange={handleBoundsChange}
                            />
                        )}
                    </>
                ) : (
                    <div className="rounded-3xl border border-dashed border-slate-300 p-12 text-center text-slate-500 dark:border-slate-700">
                        No venues match your filters.{' '}
                        <Link
                            href={venues.index.url()}
                            className="font-medium text-slate-900 underline dark:text-white"
                        >
                            Clear filters
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}
