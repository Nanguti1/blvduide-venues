import { Head } from '@inertiajs/react';

export default function DashboardVenueCreate({
    categories,
    subscription,
}: any) {
    return (
        <>
            <Head title="Add Venue" />
            <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                    <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
                        Add New Venue
                    </h1>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Create your listing and submit it for admin review once
                        you're ready.
                    </p>
                </div>
                <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
                    <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                        <p className="text-sm font-semibold tracking-[0.24em] text-slate-500 uppercase">
                            Listing details
                        </p>
                        <div className="grid gap-4">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                                Title
                            </label>
                            <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" />
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                                    Category
                                </label>
                                <select className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100">
                                    {categories.map((category: any) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                                    Price
                                </label>
                                <input className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" />
                            </div>
                        </div>
                    </div>
                    <aside className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                        <div>
                            <p className="text-sm text-slate-500">
                                Current package
                            </p>
                            <p className="mt-2 font-semibold text-slate-900 dark:text-slate-100">
                                {subscription?.package?.name ??
                                    'No active subscription'}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Allowance</p>
                            <p className="mt-2 text-slate-900 dark:text-slate-100">
                                {subscription?.package?.max_listings ?? 0}{' '}
                                listings
                            </p>
                        </div>
                    </aside>
                </div>
            </div>
        </>
    );
}
