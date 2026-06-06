import { Head, Link } from '@inertiajs/react';
import DashboardPageShell from '@/components/dashboard-page-shell';
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
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {favorites.data?.map((venue: any) => (
                        <div
                            key={venue.id}
                            className="rounded-3xl border border-border bg-card p-6 shadow-sm"
                        >
                            <h2 className="text-xl font-semibold text-foreground">
                                {venue.title}
                            </h2>
                            <p className="mt-2 text-sm text-muted-foreground">
                                {venue.category?.name}
                            </p>
                            <div className="mt-5 flex flex-wrap gap-2">
                                <Link
                                    href={venues.show.url(venue.slug)}
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
                        </div>
                    ))}
                </div>
            </DashboardPageShell>
        </>
    );
}
