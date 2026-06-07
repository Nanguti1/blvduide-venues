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
                <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
                    <table className="min-w-full divide-y divide-border text-left text-sm">
                        <thead className="bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Title</th>
                                <th className="px-6 py-4 font-semibold">Category</th>
                                <th className="px-6 py-4 font-semibold">Owner</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border bg-white dark:bg-slate-950">
                            {venues.data?.map((venue: any) => (
                                <tr key={venue.id} className="hover:bg-slate-50 dark:hover:bg-slate-900">
                                    <td className="px-6 py-4 align-top text-slate-900 dark:text-slate-100">
                                        {venue.title}
                                    </td>
                                    <td className="px-6 py-4 align-top text-slate-600 dark:text-slate-300">
                                        {venue.category?.name}
                                    </td>
                                    <td className="px-6 py-4 align-top text-slate-600 dark:text-slate-300">
                                        {venue.user?.name}
                                    </td>
                                    <td className="px-6 py-4 align-top text-slate-600 dark:text-slate-300">
                                        {venue.approval_status}
                                    </td>
                                    <td className="px-6 py-4 align-top text-right">
                                        <div className="flex flex-wrap justify-end gap-2">
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
