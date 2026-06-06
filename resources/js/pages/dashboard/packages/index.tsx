import { Head, Link, usePage } from '@inertiajs/react';
import DashboardPageShell from '@/components/dashboard-page-shell';
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
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {packages.map((packageItem: any) => (
                        <div
                            key={packageItem.id}
                            className="rounded-3xl border border-border bg-card p-6 shadow-sm"
                        >
                            <h2 className="text-xl font-semibold text-foreground">
                                {packageItem.name}
                            </h2>
                            <p className="mt-2 text-sm text-muted-foreground">
                                {formatPrice(packageItem.price)}
                            </p>
                            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                                <li>{packageItem.duration_days} days</li>
                                <li>{packageItem.max_listings} listings</li>
                                <li>
                                    {packageItem.max_images_per_listing} images
                                    per listing
                                </li>
                            </ul>
                            <div className="mt-5 flex flex-wrap gap-2">
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
                        </div>
                    ))}
                </div>
            </DashboardPageShell>
        </>
    );
}
