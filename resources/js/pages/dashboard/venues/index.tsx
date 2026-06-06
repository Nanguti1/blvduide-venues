import { Head, Link } from '@inertiajs/react';
import dashboardVenues from '@/routes/dashboard/venues';

export default function DashboardVenuesIndex({ venues }: { venues: any }) {
    return (
        <>
            <Head title="My Venues" />
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
                            My Listings
                        </h1>
                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                            Manage your venue inventory, approval status, and
                            submission workflow.
                        </p>
                    </div>
                    <Link
                        href={dashboardVenues.create.url()}
                        className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
                    >
                        Add Venue
                    </Link>
                </div>
                <div className="space-y-4">
                    {venues.data?.map((venue: any) => (
                        <article
                            key={venue.id}
                            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
                        >
                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                                        {venue.title}
                                    </h2>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        Status: {venue.approval_status}
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <Link
                                        href={dashboardVenues.edit.url(
                                            venue.slug,
                                        )}
                                        className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                                    >
                                        Edit
                                    </Link>
                                    <Link
                                        href={dashboardVenues.submit.url(
                                            venue.slug,
                                        )}
                                        method="patch"
                                        as="button"
                                        className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
                                    >
                                        Submit for approval
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </>
    );
}
