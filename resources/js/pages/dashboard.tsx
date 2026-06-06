import { Head, Link, usePage } from '@inertiajs/react';
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
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
                    Welcome back, {auth.user?.name}
                </h1>
                <p className="mt-2 text-slate-500">
                    Manage your venue listings and subscription from here.
                </p>

                <div className="mt-8 grid gap-4 md:grid-cols-4">
                    {[
                        { label: 'Listings', value: stats.listings },
                        { label: 'Pending approval', value: stats.pending },
                        { label: 'Favorites', value: stats.favorites },
                        { label: 'Subscription', value: stats.subscription },
                    ].map((item) => (
                        <div
                            key={item.label}
                            className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900"
                        >
                            <p className="text-sm text-slate-500">{item.label}</p>
                            <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                                {item.value}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                        href={dashboardVenues.create.url()}
                        className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white dark:bg-white dark:text-slate-900"
                    >
                        Add venue
                    </Link>
                    <Link
                        href={dashboardVenues.index.url()}
                        className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold dark:border-slate-600"
                    >
                        My listings
                    </Link>
                    <Link
                        href={venues.index.url()}
                        className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold dark:border-slate-600"
                    >
                        Browse marketplace
                    </Link>
                </div>
            </div>
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
