import { Head, Link } from '@inertiajs/react';
import DashboardPageShell from '@/components/dashboard-page-shell';
import { formatPrice } from '@/lib/money';
import dashboardPackages from '@/routes/dashboard/packages';

export default function DashboardPackageShow({ package: pkg }: any) {
    return (
        <>
            <Head title={pkg.name} />
            <DashboardPageShell
                title={pkg.name}
                action={
                    <Link
                        href={dashboardPackages.edit.url(pkg.id)}
                        className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                    >
                        Edit Package
                    </Link>
                }
            >
                <div className="max-w-3xl rounded-3xl border border-border bg-card p-6 shadow-sm">
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="mt-2 text-3xl font-semibold text-foreground">
                        {formatPrice(pkg.price)}
                    </p>
                    <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                        <li>
                            <strong>{pkg.duration_days} days</strong> duration
                        </li>
                        <li>
                            <strong>{pkg.max_listings}</strong> max listings
                        </li>
                        <li>
                            <strong>{pkg.max_images_per_listing}</strong>{' '}
                            images per listing
                        </li>
                        <li>
                            <strong>{pkg.featured_listing_allowance}</strong>{' '}
                            featured venues allowed
                        </li>
                    </ul>
                </div>
            </DashboardPageShell>
        </>
    );
}
