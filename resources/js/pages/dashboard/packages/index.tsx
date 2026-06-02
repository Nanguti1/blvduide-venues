import { Head } from '@inertiajs/react';

export default function DashboardPackagesIndex({ packages }: any) {
    return (
        <>
            <Head title="Packages" />
            <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
                    Packages
                </h1>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    Review plan settings, pricing, and listing allowances.
                </p>
                <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {packages.map((packageItem: any) => (
                        <div
                            key={packageItem.id}
                            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
                        >
                            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                                {packageItem.name}
                            </h2>
                            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                ${packageItem.price}
                            </p>
                            <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                                <li>{packageItem.duration_days} days</li>
                                <li>{packageItem.max_listings} listings</li>
                                <li>
                                    {packageItem.max_images_per_listing} images
                                    per listing
                                </li>
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
