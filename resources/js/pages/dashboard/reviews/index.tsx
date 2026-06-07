import { Head, Link } from '@inertiajs/react';
import DashboardPageShell from '@/components/dashboard-page-shell';
import Pagination from '@/components/pagination';
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
                <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
                    <table className="min-w-full divide-y divide-border text-left text-sm">
                        <thead className="bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold">
                                    Venue
                                </th>
                                <th className="px-6 py-4 font-semibold">
                                    Comment
                                </th>
                                <th className="px-6 py-4 font-semibold">
                                    Rating
                                </th>
                                <th className="px-6 py-4 font-semibold">
                                    Status
                                </th>
                                <th className="px-6 py-4 font-semibold">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border bg-white dark:bg-slate-950">
                            {reviews.data?.map((review: any) => (
                                <tr
                                    key={review.id}
                                    className="hover:bg-slate-50 dark:hover:bg-slate-900"
                                >
                                    <td className="px-6 py-4 align-top text-slate-900 dark:text-slate-100">
                                        {review.venue?.title ?? 'Deleted venue'}
                                    </td>
                                    <td className="px-6 py-4 align-top text-slate-600 dark:text-slate-300">
                                        {review.comment?.slice(0, 80)}
                                        {review.comment?.length > 80 ? '…' : ''}
                                    </td>
                                    <td className="px-6 py-4 align-top text-slate-600 dark:text-slate-300">
                                        {review.rating ?? '–'}
                                    </td>
                                    <td className="px-6 py-4 align-top text-slate-600 dark:text-slate-300">
                                        {review.status}
                                    </td>
                                    <td className="px-6 py-4 text-right align-top">
                                        {review.venue?.slug ? (
                                            <Link
                                                href={venues.show.url(
                                                    review.venue.slug,
                                                )}
                                                className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                                            >
                                                View Venue
                                            </Link>
                                        ) : (
                                            <span className="text-sm text-slate-500">
                                                No action
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination resource={reviews} />
            </DashboardPageShell>
        </>
    );
}
