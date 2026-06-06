import { Head, Link, router } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import VenueCard from '@/components/venue-card';
import venues from '@/routes/venues';

export default function Home({
    featuredVenues,
    latestVenues,
    categories,
}: {
    featuredVenues: any[];
    latestVenues: any[];
    categories: any[];
}) {
    const [query, setQuery] = useState('');

    function search(e: FormEvent) {
        e.preventDefault();
        router.get(venues.index.url(), query ? { q: query } : {});
    }

    return (
        <>
            <Head title="Find Your Perfect Venue" />
            <section className="relative overflow-hidden bg-slate-950 px-4 py-20 text-white sm:px-6 lg:px-8">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(148,163,184,0.25),transparent_55%)]" />
                <div className="relative mx-auto max-w-4xl text-center">
                    <p className="text-sm tracking-[0.3em] text-slate-400 uppercase">
                        BlvdGuide Marketplace
                    </p>
                    <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                        Discover exceptional spaces for every occasion
                    </h1>
                    <p className="mt-4 text-lg text-slate-300">
                        Coworking lofts, wedding gardens, conference halls, and
                        more — curated for memorable experiences.
                    </p>
                    <form
                        onSubmit={search}
                        className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row"
                    >
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search by venue name or description..."
                            className="flex-1 rounded-full border-0 px-5 py-4 text-slate-900 outline-none"
                        />
                        <button
                            type="submit"
                            className="rounded-full bg-white px-6 py-4 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                        >
                            Search venues
                        </button>
                    </form>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mb-8 flex items-end justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                            Featured venues
                        </h2>
                        <p className="mt-2 text-slate-500">
                            Hand-picked spaces with premium visibility
                        </p>
                    </div>
                    <Link
                        href={venues.index.url({ query: { featured: '1' } })}
                        className="text-sm font-medium text-slate-900 underline dark:text-white"
                    >
                        View all featured
                    </Link>
                </div>
                {featuredVenues.length ? (
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {featuredVenues.map((venue) => (
                            <VenueCard key={venue.id} venue={venue} />
                        ))}
                    </div>
                ) : (
                    <p className="text-slate-500">
                        Featured venues will appear here once listings are
                        published.
                    </p>
                )}
            </section>

            <section className="bg-white py-16 dark:bg-slate-900">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="mb-8 text-2xl font-semibold text-slate-900 dark:text-white">
                        Popular categories
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                href={venues.categories.show.url(category.slug)}
                                className="rounded-3xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-950"
                            >
                                <p className="text-lg font-semibold text-slate-900 dark:text-white">
                                    {category.name}
                                </p>
                                <p className="mt-2 text-sm text-slate-500">
                                    Browse {category.name.toLowerCase()}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mb-8 flex items-end justify-between">
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                        Latest venues
                    </h2>
                    <Link
                        href={venues.index.url()}
                        className="text-sm font-medium text-slate-900 underline dark:text-white"
                    >
                        Browse all
                    </Link>
                </div>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {latestVenues.map((venue) => (
                        <VenueCard key={venue.id} venue={venue} />
                    ))}
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
                <div className="rounded-[2rem] bg-slate-900 px-8 py-12 text-center text-white dark:bg-slate-800">
                    <h2 className="text-3xl font-semibold">
                        List your venue on BlvdGuide
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-slate-300">
                        Join our marketplace, choose a subscription package, and
                        reach clients looking for premium spaces.
                    </p>
                    <Link
                        href="/register"
                        className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900"
                    >
                        Get started
                    </Link>
                </div>
            </section>
        </>
    );
}
