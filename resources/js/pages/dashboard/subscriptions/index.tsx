import { Head } from '@inertiajs/react';

export default function DashboardSubscriptionsIndex({ subscriptions }: any) {
    return (
        <>
            <Head title="Subscriptions" />
            <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
                    Subscriptions
                </h1>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    Track active packages, renewal windows, and payment status.
                </p>
                <div className="mb-6">
                    <a
                        href={route('dashboard.packages.index')}
                        className="rounded-full bg-slate-800 px-4 py-2 text-white"
                    >
                        Manage Packages
                    </a>
                </div>
                <div className="mt-8 space-y-4">
                    {subscriptions.data?.map((subscription: any) => (
                        <div
                            key={subscription.id}
                            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
                        >
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                                        {subscription.package?.name}
                                    </h2>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        Expires{' '}
                                        {new Date(
                                            subscription.expires_at,
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                                    {subscription.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
