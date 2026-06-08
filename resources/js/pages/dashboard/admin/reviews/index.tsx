import { Head, Link, router } from '@inertiajs/react';
import FilterBar from '@/components/dashboard/filter-bar';
import DashboardPageShell from '@/components/dashboard-page-shell';
import Pagination from '@/components/pagination';
import venues from '@/routes/venues';

export default function AdminReviewsIndex({ reviews, filters = {} }: any) {
    return (
        <>
            <Head title="Review Moderation" />
            <DashboardPageShell
                title="Review Moderation"
                description="Approve or reject guest reviews across all venues."
            >
                <FilterBar
                    filters={filters}
                    fields={[
                        {
                            label: 'Search',
                            name: 'q',
                            placeholder: 'Venue, reviewer, comment',
                        },
                        {
                            label: 'Status',
                            name: 'status',
                            type: 'select',
                            options: [
                                { label: 'Pending', value: 'pending' },
                                { label: 'Approved', value: 'approved' },
                                { label: 'Rejected', value: 'rejected' },
                            ],
                        },
                        {
                            label: 'Rating',
                            name: 'rating',
                            type: 'select',
                            options: [1, 2, 3, 4, 5].map((rating) => ({
                                label: `${rating} star${rating === 1 ? '' : 's'}`,
                                value: rating,
                            })),
                        },
                    ]}
                />
                <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
                    <table className="min-w-full divide-y divide-border text-left text-sm">
                        <thead className="bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold">
                                    Venue
                                </th>
                                <th className="px-6 py-4 font-semibold">
                                    Reviewer
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
                                        {review.user?.name ?? 'Guest'}
                                    </td>
                                    <td className="px-6 py-4 align-top text-slate-600 dark:text-slate-300">
                                        {review.comment?.slice(0, 90)}
                                        {review.comment?.length > 90 ? '…' : ''}
                                    </td>
                                    <td className="px-6 py-4 align-top text-slate-600 dark:text-slate-300">
                                        {review.rating ?? '–'}
                                    </td>
                                    <td className="px-6 py-4 align-top text-slate-600 dark:text-slate-300">
                                        {review.status}
                                    </td>
                                    <td className="px-6 py-4 text-right align-top">
                                        <div className="flex flex-wrap justify-end gap-2">
                                            {review.venue?.slug ? (
                                                <Link
                                                    href={venues.show.url(
                                                        review.venue.slug,
                                                    )}
                                                    className="rounded-full border border-border px-4 py-2 text-sm transition hover:bg-muted"
                                                >
                                                    View Venue
                                                </Link>
                                            ) : null}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    router.patch(
                                                        `/dashboard/admin/reviews/${review.id}/approve`,
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
                                                        `/dashboard/admin/reviews/${review.id}/reject`,
                                                    )
                                                }
                                                className="rounded-full bg-destructive px-4 py-2 text-sm font-semibold text-white transition hover:bg-destructive/90"
                                            >
                                                Reject
                                            </button>
                                        </div>
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
