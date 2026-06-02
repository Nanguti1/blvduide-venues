import { Head, useForm } from '@inertiajs/react';

export default function PackageEdit({ package: pkg }: any) {
    const { data, setData, put, processing } = useForm({
        name: pkg.name,
        price: pkg.price,
        duration_days: pkg.duration_days,
        max_listings: pkg.max_listings,
        max_images_per_listing: pkg.max_images_per_listing,
        featured_listing_allowance: pkg.featured_listing_allowance,
        badge_color: pkg.badge_color,
        support_features: pkg.support_features ?? [],
        is_active: pkg.is_active,
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        put(route('dashboard.packages.update', pkg.id));
    }

    return (
        <>
            <Head title={`Edit ${pkg.name}`} />
            <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Name</label>
                        <input value={data.name} onChange={(e) => setData('name', e.target.value)} className="mt-2 w-full rounded-2xl border px-4 py-2" />
                    </div>
                    <div className="flex items-center justify-end">
                        <button type="submit" disabled={processing} className="rounded-full bg-slate-900 px-4 py-2 text-white">Save</button>
                    </div>
                </form>
            </div>
        </>
    );
}
