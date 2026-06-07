import { Head, Link, usePage } from '@inertiajs/react';
import DashboardPageShell from '@/components/dashboard-page-shell';
import Pagination from '@/components/pagination';
import { formatPrice } from '@/lib/money';
import dashboardPackages from '@/routes/dashboard/packages';

export default function DashboardPackagesIndex({ packages }: any) {
    const { auth } = usePage().props as {
        auth: { user?: { permissions?: string[] } };
    };
    const canManage = auth.user?.permissions?.includes('packages.manage');

    return (
        <>
            <Head title="Packages" />
            <DashboardPageShell
                title="Packages"
                description="Review plan settings, pricing, and listing allowances."
                action={
                    canManage ? (
                        <Link
                            href={dashboardPackages.create.url()}
                            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                        >
                            Add Package
                        </Link>
                    ) : null
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
                                    Price
                                </th>
                                <th className="px-6 py-4 font-semibold">
                                    Duration
                                </th>
                                <th className="px-6 py-4 font-semibold">
                                    Listings
                                </th>
                                <th className="px-6 py-4 font-semibold">
                                    Images
                                </th>
                                <th className="px-6 py-4 font-semibold">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border bg-white dark:bg-slate-950">
                            {packages.data?.map((packageItem: any) => (
                                <tr
                                    key={packageItem.id}
                                    className="hover:bg-slate-50 dark:hover:bg-slate-900"
                                >
                                    <td className="px-6 py-4 align-top">
                                        <p className="font-semibold text-slate-900 dark:text-slate-100">
                                            {packageItem.name}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4 align-top text-slate-600 dark:text-slate-300">
                                        {formatPrice(packageItem.price)}
                                    </td>
                                    <td className="px-6 py-4 align-top text-slate-600 dark:text-slate-300">
                                        {packageItem.duration_days} days
                                    </td>
                                    <td className="px-6 py-4 align-top text-slate-600 dark:text-slate-300">
                                        {packageItem.max_listings}
                                    </td>
                                    <td className="px-6 py-4 align-top text-slate-600 dark:text-slate-300">
                                        {packageItem.max_images_per_listing}
                                    </td>
                                    <td className="px-6 py-4 text-right align-top">
                                        <div className="flex flex-wrap justify-end gap-2">
                                            <Link
                                                href={dashboardPackages.show.url(
                                                    packageItem.id,
                                                )}
                                                className="rounded-full border border-border px-4 py-2 text-sm transition hover:bg-muted"
                                            >
                                                View
                                            </Link>
                                            {canManage ? (
                                                <Link
                                                    href={dashboardPackages.edit.url(
                                                        packageItem.id,
                                                    )}
                                                    className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                                                >
                                                    Edit
                                                </Link>
                                            ) : null}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination resource={packages} />
            </DashboardPageShell>
        </>
    );
}
