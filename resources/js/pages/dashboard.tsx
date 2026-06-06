import { Head, Link, usePage } from '@inertiajs/react';
import DashboardPageShell from '@/components/dashboard-page-shell';
import { dashboard } from '@/routes';
import dashboardVenues from '@/routes/dashboard/venues';
import venues from '@/routes/venues';

export default function Dashboard({
    stats,
}: {
    stats: {
        listings: number;
        pending: number;
        favorites: number;
        subscription: string;
    };
}) {
    const { auth } = usePage().props as { auth: { user?: { name: string } } };

    return (
        <>
            <Head title="Dashboard" />
            <DashboardPageShell
                title={`Welcome back, ${auth.user?.name}`}
                description="Manage your venue listings and subscription from here."
                action={
                    <>
                        <Link
                            href={dashboardVenues.create.url()}
                            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                        >
                            Add venue
                        </Link>
                        <Link
                            href={dashboardVenues.index.url()}
                            className="inline-flex items-center justify-center rounded-full border border-border px-5 py-3 text-sm font-semibold transition hover:bg-muted"
                        >
                            My listings
                        </Link>
                        <Link
                            href={venues.index.url()}
                            className="inline-flex items-center justify-center rounded-full border border-border px-5 py-3 text-sm font-semibold transition hover:bg-muted"
                        >
                            Browse marketplace
                        </Link>
                    </>
                }
            >
                <div className="grid gap-4 md:grid-cols-4">
                    {[
                        { label: 'Listings', value: stats.listings },
                        { label: 'Pending approval', value: stats.pending },
                        { label: 'Favorites', value: stats.favorites },
                        { label: 'Subscription', value: stats.subscription },
                    ].map((item) => (
                        <div
                            key={item.label}
                            className="rounded-3xl border border-border bg-card p-6"
                        >
                            <p className="text-sm text-muted-foreground">
                                {item.label}
                            </p>
                            <p className="mt-2 text-2xl font-semibold text-foreground">
                                {item.value}
                            </p>
                        </div>
                    ))}
                </div>
            </DashboardPageShell>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
