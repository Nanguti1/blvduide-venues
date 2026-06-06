import { Head } from '@inertiajs/react';
import DashboardPageShell from '@/components/dashboard-page-shell';

export default function DashboardSubscriptionShow({ subscription }: any) {
    return (
        <>
            <Head title="Subscription Details" />
            <DashboardPageShell title="Subscription details">
                <div className="max-w-3xl rounded-3xl border border-border bg-card p-6 shadow-sm">
                    <p className="text-sm text-muted-foreground">Plan</p>
                    <p className="mt-2 text-2xl font-semibold text-foreground">
                        {subscription.package?.name}
                    </p>
                    <p className="mt-4 text-sm text-muted-foreground">
                        Status: {subscription.status}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Expires:{' '}
                        {new Date(subscription.expires_at).toLocaleDateString()}
                    </p>
                </div>
            </DashboardPageShell>
        </>
    );
}
