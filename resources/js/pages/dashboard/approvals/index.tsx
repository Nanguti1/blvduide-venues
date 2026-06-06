import { Head, Link, router } from '@inertiajs/react';

export default function ApprovalsIndex({ venues }: any) {
    return (
        <>
            <Head title="Venue Approvals" />
            <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-semibold">Venue Approvals</h1>
                <p className="mt-2 text-sm text-slate-500">
                    Review pending listings before they go live.
                </p>
                <div className="mt-8 space-y-4">
                    {venues.data?.map((venue: any) => (
                        <article
                            key={venue.id}
                            className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900"
                        >
                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold">
                                        {venue.title}
                                    </h2>
                                    <p className="text-sm text-slate-500">
                                        {venue.category?.name} · by{' '}
                                        {venue.user?.name} ·{' '}
                                        {venue.approval_status}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <Link
                                        href={`/venues/${venue.slug}`}
                                        className="rounded-full border px-4 py-2 text-sm"
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
                                        className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
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
                                        className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white"
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </>
    );
}
