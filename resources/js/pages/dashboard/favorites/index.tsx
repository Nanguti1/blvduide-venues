import { Head } from '@inertiajs/react';

export default function DashboardFavoritesIndex({ favorites }: any) {
    return (
        <>
            <Head title="Favorites" />
            <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
                    Favorites
                </h1>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    Your saved venues for future booking and review.
                </p>
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                    {favorites.data?.map((venue: any) => (
                        <div
                            key={venue.id}
                            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
                        >
                            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                                {venue.title}
                            </h2>
                            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                {venue.category?.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
