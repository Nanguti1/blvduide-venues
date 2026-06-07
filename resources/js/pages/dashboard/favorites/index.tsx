import { Head, Link } from '@inertiajs/react';
import DashboardPageShell from '@/components/dashboard-page-shell';
import Pagination from '@/components/pagination';
import dashboardFavorites from '@/routes/dashboard/favorites';
import venues from '@/routes/venues';

export default function DashboardFavoritesIndex({ favorites }: any) {
    return (
        <>
            <Head title="Favorites" />
            <DashboardPageShell
                title="Favorites"
                description="Your saved venues for future booking and review."
                action={
                    <Link
                        href={venues.index.url()}
                        className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                    >
                        Browse Venues
                    </Link>
                }
            >
                <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
                    <table className="min-w-full divide-y divide-border text-left text-sm">
                        <thead className="bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold">
                                    Venue
                                </th>
                                <th className="px-6 py-4 font-semibold">
                                    Category
                                </th>
                                <th className="px-6 py-4 font-semibold">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border bg-white dark:bg-slate-950">
                            {favorites.data?.map((venue: any) => (
                                <tr
                                    key={venue.id}
                                    className="hover:bg-slate-50 dark:hover:bg-slate-900"
                                >
                                    <td className="px-6 py-4 align-top text-slate-900 dark:text-slate-100">
                                        {venue.title}
                                    </td>
                                    <td className="px-6 py-4 align-top text-slate-600 dark:text-slate-300">
                                        {venue.category?.name}
                                    </td>
                                    <td className="px-6 py-4 text-right align-top">
                                        <div className="flex flex-wrap justify-end gap-2">
                                            <Link
                                                href={venues.show.url(
                                                    venue.slug,
                                                )}
                                                className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                                            >
                                                View
                                            </Link>
                                            <Link
                                                href={dashboardFavorites.toggle.url(
                                                    venue.slug,
                                                )}
                                                method="post"
                                                as="button"
                                                className="rounded-full border border-border px-4 py-2 text-sm transition hover:bg-muted"
                                            >
                                                Remove
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination resource={favorites} />
            </DashboardPageShell>
        </>
    );
}
