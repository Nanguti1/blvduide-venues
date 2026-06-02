import { Head } from '@inertiajs/react';

export default function DashboardPackageShow({ package: pkg }: any) {
    return (
        <>
            <Head title={pkg.name} />
            <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">{pkg.name}</h1>
                <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Price</p>
                    <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">${pkg.price}</p>
                    <ul className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                        <li><strong>{pkg.duration_days} days</strong> duration</li>
                        <li><strong>{pkg.max_listings}</strong> max listings</li>
                        <li><strong>{pkg.max_images_per_listing}</strong> images per listing</li>
                        <li><strong>{pkg.featured_listing_allowance}</strong> featured venues allowed</li>
                    </ul>
                </div>
            </div>
        </>
    );
}
