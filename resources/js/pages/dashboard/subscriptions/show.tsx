import { Head } from '@inertiajs/react';

export default function DashboardSubscriptionShow({ subscription }: any) {
    return (
        <>
            <Head title="Subscription Details" />
            <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
                    Subscription details
                </h1>
                <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Plan
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                        {subscription.package?.name}
                    </p>
                    <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                        Status: {subscription.status}
                    </p>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Expires:{' '}
                        {new Date(subscription.expires_at).toLocaleDateString()}
                    </p>
                </div>
            </div>
        </>
    );
}
