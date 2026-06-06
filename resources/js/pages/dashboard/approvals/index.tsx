import { Head, Link, router } from '@inertiajs/react';
import DashboardPageShell from '@/components/dashboard-page-shell';

export default function ApprovalsIndex({ venues }: any) {
    return (
        <>
            <Head title="Venue Approvals" />
            <DashboardPageShell
                title="Venue Approvals"
                description="Review pending listings before they go live."
            >
                <div className="space-y-4">
                    {venues.data?.map((venue: any) => (
                        <article
                            key={venue.id}
                            className="rounded-3xl border border-border bg-card p-6"
                        >
                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold text-foreground">
                                        {venue.title}
                                    </h2>
                                    <p className="text-sm text-muted-foreground">
                                        {venue.category?.name} · by{' '}
                                        {venue.user?.name} ·{' '}
                                        {venue.approval_status}
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <Link
                                        href={`/venues/${venue.slug}`}
                                        className="rounded-full border border-border px-4 py-2 text-sm transition hover:bg-muted"
                                    >
                                        Preview
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            router.patch(
                                                `/dashboard/approvals/${venue.slug}/approve`,
                                            )
                                        }
                                        className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            router.patch(
                                                `/dashboard/approvals/${venue.slug}/reject`,
                                            )
                                        }
                                        className="rounded-full bg-destructive px-4 py-2 text-sm font-semibold text-white transition hover:bg-destructive/90"
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </DashboardPageShell>
        </>
    );
}
