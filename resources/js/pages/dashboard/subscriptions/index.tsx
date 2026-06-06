import { Head, Link } from '@inertiajs/react';
import DashboardPageShell from '@/components/dashboard-page-shell';
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
                <div className="space-y-4">
                    {(subscriptions ?? []).map((subscription: any) => (
                        <div
                            key={subscription.id}
                            className="rounded-3xl border border-border bg-card p-6 shadow-sm"
                        >
                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold text-foreground">
                                        {subscription.package?.name}
                                    </h2>
                                    <p className="text-sm text-muted-foreground">
                                        Expires{' '}
                                        {new Date(
                                            subscription.expires_at,
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="rounded-full bg-muted px-3 py-1 text-sm text-foreground">
                                        {subscription.status}
                                    </span>
                                    <Link
                                        href={dashboardSubscriptions.show.url(
                                            subscription.id,
                                        )}
                                        className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                                    >
                                        View
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </DashboardPageShell>
        </>
    );
}
