import { Head, Link } from '@inertiajs/react';
import DashboardPageShell from '@/components/dashboard-page-shell';
import venues from '@/routes/venues';

export default function DashboardReviewsIndex({ reviews }: any) {
    return (
        <>
            <Head title="Reviews" />
            <DashboardPageShell
                title="Reviews"
                description="Monitor guest feedback and moderation status for your venues."
                action={
                    <Link
                        href={venues.index.url()}
                        className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                    >
                        Browse Venues
                    </Link>
                }
            >
                <div className="space-y-4">
                    {reviews.data?.map((review: any) => (
                        <div
                            key={review.id}
                            className="rounded-3xl border border-border bg-card p-6 shadow-sm"
                        >
                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold text-foreground">
                                        {review.venue?.title}
                                    </h2>
                                    <p className="text-sm text-muted-foreground">
                                        {review.comment}
                                    </p>
                                </div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="rounded-full bg-muted px-3 py-1 text-sm text-foreground">
                                        {review.status}
                                    </span>
                                    {review.venue?.slug ? (
                                        <Link
                                            href={venues.show.url(
                                                review.venue.slug,
                                            )}
                                            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                                        >
                                            View Venue
                                        </Link>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </DashboardPageShell>
        </>
    );
}
