import { Head, useForm } from '@inertiajs/react';
import dashboardPackages from '@/routes/dashboard/packages';

export default function PackageCreate() {
    const { data, setData, post, processing } = useForm({
        name: '',
        price: 0,
        duration_days: 30,
        max_listings: 0,
        max_images_per_listing: 0,
        featured_listing_allowance: 0,
        badge_color: '#64748b',
        support_features: [],
        is_active: true,
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post(dashboardPackages.store.url());
    }

    return (
        <>
            <Head title="Create Package" />
            <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">
                            Name
                        </label>
                        <input
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-2 w-full rounded-2xl border px-4 py-2"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium">
                                Price
                            </label>
                            <input
                                type="number"
                                value={data.price}
                                onChange={(e) =>
                                    setData('price', Number(e.target.value))
                                }
                                className="mt-2 w-full rounded-2xl border px-4 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">
                                Duration (days)
                            </label>
                            <input
                                type="number"
                                value={data.duration_days}
                                onChange={(e) =>
                                    setData(
                                        'duration_days',
                                        Number(e.target.value),
                                    )
                                }
                                className="mt-2 w-full rounded-2xl border px-4 py-2"
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-full bg-slate-900 px-4 py-2 text-white"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
