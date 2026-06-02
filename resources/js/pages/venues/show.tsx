import { Head, usePage } from '@inertiajs/react';

export default function VenueShow() {
    const { venue, related } = usePage().props as any;

    return (
        <>
            <Head title={venue.title} />
            <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
                <section className="grid gap-8 lg:grid-cols-[1.5fr_0.9fr]">
                    <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                        <div className="space-y-3">
                            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">{venue.category?.name}</p>
                            <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">{venue.title}</h1>
                            <p className="text-slate-600 dark:text-slate-300">{venue.short_description}</p>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <p className="text-sm text-slate-500">Location</p>
                                <p className="font-medium text-slate-900 dark:text-white">{venue.locale?.name ?? venue.city?.name}, {venue.country?.name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Capacity</p>
                                <p className="font-medium text-slate-900 dark:text-white">{venue.capacity ?? 'N/A'}</p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-slate-500">Description</p>
                            <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{venue.description}</p>
                        </div>
                    </div>
                    <aside className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                        <div className="rounded-3xl bg-slate-950 p-6 text-white">
                            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Price</p>
                            <p className="mt-3 text-4xl font-semibold">${venue.price ?? 'Contact'}</p>
                        </div>
                        <div className="space-y-3">
                            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Amenities</p>
                            <div className="flex flex-wrap gap-2">
                                {venue.features?.map((feature: any) => (
                                    <span key={feature.id} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-300">{feature.name}</span>
                                ))}
                            </div>
                        </div>
                    </aside>
                </section>
                <section className="mt-12">
                    <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-white">Related spaces</h2>
                    <div className="grid gap-4 md:grid-cols-2">
                        {related?.map((item: any) => (
                            <article key={item.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{item.short_description}</p>
                            </article>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
}
