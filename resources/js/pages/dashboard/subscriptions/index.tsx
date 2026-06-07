import { Head, Link } from '@inertiajs/react';
import DashboardPageShell from '@/components/dashboard-page-shell';
import Pagination from '@/components/pagination';
import dashboardPackages from '@/routes/dashboard/packages';
import dashboardSubscriptions from '@/routes/dashboard/subscriptions';

export default function DashboardSubscriptionsIndex({ subscriptions }: any) {
    return (
        <>
            <Head title="Subscriptions" />
            <DashboardPageShell
                title="Subscriptions"
                description="Track active packages, renewal windows, and payment status."
                action={
                    <>
                        <Link
                            href={dashboardPackages.index.url()}
                            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                        >
                            Browse Packages
                        </Link>
                    </>
                }
            >
                <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
                    <table className="min-w-full divide-y divide-border text-left text-sm">
                        <thead className="bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold">
                                    Package
                                </th>
                                <th className="px-6 py-4 font-semibold">
                                    Expires
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
                            {subscriptions.data?.map((subscription: any) => (
                                <tr
                                    key={subscription.id}
                                    className="hover:bg-slate-50 dark:hover:bg-slate-900"
                                >
                                    <td className="px-6 py-4 align-top text-slate-900 dark:text-slate-100">
                                        {subscription.package?.name}
                                    </td>
                                    <td className="px-6 py-4 align-top text-slate-600 dark:text-slate-300">
                                        {new Date(
                                            subscription.expires_at,
                                        ).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 align-top text-slate-600 dark:text-slate-300">
                                        {subscription.status}
                                    </td>
                                    <td className="px-6 py-4 text-right align-top">
                                        <Link
                                            href={dashboardSubscriptions.show.url(
                                                subscription.id,
                                            )}
                                            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                                        >
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination resource={subscriptions} />
            </DashboardPageShell>
        </>
    );
}
