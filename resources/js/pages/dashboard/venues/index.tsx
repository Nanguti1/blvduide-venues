import { Head, Link } from '@inertiajs/react';
import DashboardPageShell from '@/components/dashboard-page-shell';
import dashboardVenues from '@/routes/dashboard/venues';

export default function DashboardVenuesIndex({ venues }: { venues: any }) {
    return (
        <>
            <Head title="My Venues" />
            <DashboardPageShell
                title="My Listings"
                description="Manage your venue inventory, approval status, and submission workflow."
                action={
                    <Link
                        href={dashboardVenues.create.url()}
                        className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                    >
                        Add Venue
                    </Link>
                }
            >
                <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
                    <table className="min-w-full divide-y divide-border text-left text-sm">
                        <thead className="bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Title</th>
                                <th className="px-6 py-4 font-semibold">Category</th>
                                <th className="px-6 py-4 font-semibold">Location</th>
                                <th className="px-6 py-4 font-semibold">Price</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border bg-white dark:bg-slate-950">
                            {venues.data?.map((venue: any) => (
                                <tr key={venue.id} className="hover:bg-slate-50 dark:hover:bg-slate-900">
                                    <td className="px-6 py-4 align-top">
                                        <p className="font-semibold text-slate-900 dark:text-slate-100">{venue.title}</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">{venue.short_description}</p>
                                    </td>
                                    <td className="px-6 py-4 align-top text-slate-600 dark:text-slate-300">
                                        {venue.category?.name}
                                    </td>
                                    <td className="px-6 py-4 align-top text-slate-600 dark:text-slate-300">
                                        {venue.city?.name ?? venue.locale?.name ?? '–'}, {venue.country?.name ?? '–'}
                                    </td>
                                    <td className="px-6 py-4 align-top text-slate-600 dark:text-slate-300">
                                        {venue.price ? `₦${venue.price}` : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 align-top text-slate-600 dark:text-slate-300">
                                        {venue.approval_status}
                                    </td>
                                    <td className="px-6 py-4 align-top text-right">
                                        <div className="flex flex-wrap justify-end gap-2">
                                            <Link
                                                href={dashboardVenues.edit.url(venue.slug)}
                                                className="rounded-full border border-border px-4 py-2 text-sm transition hover:bg-muted"
                                            >
                                                Edit
                                            </Link>
                                            <Link
                                                href={dashboardVenues.submit.url(venue.slug)}
                                                method="patch"
                                                as="button"
                                                className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                                            >
                                                Submit
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </DashboardPageShell>
        </>
    );
}
