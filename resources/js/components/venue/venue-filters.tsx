import { Head, Link, router } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import VenueCard from '@/components/venue-card';
import venues from '@/routes/venues';

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
            filters.featured === '1' ||
            String(filters.featured) === 'true',
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
                if (value) query.featured = '1';
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

        router.get(venues.index.url(), query, { preserveState: true });
    }

    return (
        <>
            <Head
                title={
                    category?.name ?? locale?.name ?? 'Discover Venues'
                }
            />
            <div className="mx-auto max-w-8xl px-4 py-10 sm:px-6 lg:px-8">
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
                            setLocalFilters({ ...localFilters, q: e.target.value })
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

                {venueList.data?.length ? (
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {venueList.data.map((venue: any) => (
                            <VenueCard key={venue.id} venue={venue} />
                        ))}
                    </div>
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
