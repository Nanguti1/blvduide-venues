import { Head } from '@inertiajs/react';

export default function DashboardVenueEdit({ venue, categories }: any) {
    return (
        <>
            <Head title="Edit Venue" />
            <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                    <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
                        Edit Listing
                    </h1>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Update venue details and media, then submit changes for
                        review.
                    </p>
                </div>
                <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                    <div className="grid gap-4">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                            Venue title
                        </label>
                        <input
                            defaultValue={venue.title}
                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                        />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                                Category
                            </label>
                            <select
                                defaultValue={venue.venue_category_id}
                                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                            >
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
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                                Price
                            </label>
                            <input
                                defaultValue={venue.price}
                                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
