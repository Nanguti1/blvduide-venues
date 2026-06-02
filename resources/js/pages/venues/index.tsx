import { Head, usePage } from '@inertiajs/react';
import VenueCard from '@/components/venue-card';

export default function VenueIndex() {
    const { venues, categories, features, countries } = usePage().props as any;

    return (
        <>
            <Head title="Venues" />
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Venue marketplace</p>
                        <h1 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">Discover spaces for every event</h1>
                    </div>
                </header>

                <section className="grid gap-6 md:grid-cols-3">
                    <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Filters</h2>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Category</label>
                            <select className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white">
                                <option value="">All categories</option>
                                {categories.map((category: any) => (
                                    <option key={category.id} value={category.slug}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Features</label>
                            <div className="mt-2 grid gap-2">
                                {features.slice(0, 6).map((feature: any) => (
                                    <span key={feature.id} className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-300">{feature.name}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
                            {venues.data?.map((venue: any) => (
                                <VenueCard key={venue.id} venue={venue} />
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
