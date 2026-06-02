import { Head } from '@inertiajs/react';

export default function DashboardReviewsIndex({ reviews }: any) {
    return (
        <>
            <Head title="Reviews" />
            <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
                    Reviews
                </h1>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    Monitor guest feedback and moderation status for your
                    venues.
                </p>
                <div className="mt-8 space-y-4">
                    {reviews.data?.map((review: any) => (
                        <div
                            key={review.id}
                            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
                        >
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                                        {review.venue?.title}
                                    </h2>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        {review.comment}
                                    </p>
                                </div>
                                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                                    {review.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
