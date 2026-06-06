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
                <div className="space-y-4">
                    {venues.data?.map((venue: any) => (
                        <article
                            key={venue.id}
                            className="rounded-3xl border border-border bg-card p-6 shadow-sm"
                        >
                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold text-foreground">
                                        {venue.title}
                                    </h2>
                                    <p className="text-sm text-muted-foreground">
                                        Status: {venue.approval_status}
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <Link
                                        href={dashboardVenues.edit.url(
                                            venue.slug,
                                        )}
                                        className="rounded-full border border-border px-4 py-2 text-sm transition hover:bg-muted"
                                    >
                                        Edit
                                    </Link>
                                    <Link
                                        href={dashboardVenues.submit.url(
                                            venue.slug,
                                        )}
                                        method="patch"
                                        as="button"
                                        className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                                    >
                                        Submit for approval
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </DashboardPageShell>
        </>
    );
}
