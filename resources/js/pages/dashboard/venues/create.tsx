import { Head } from '@inertiajs/react';
import VenueForm from '@/components/venue/venue-form';

export default function DashboardVenueCreate({
    categories,
    features,
    countries,
    subscription,
}: any) {
    if (!subscription) {
        return (
            <>
                <Head title="Add Venue" />
                <div className="mx-auto max-w-3xl px-4 py-10">
                    <div className="rounded-3xl border border-amber-200 bg-amber-50 p-8 dark:border-amber-900 dark:bg-amber-950/30">
                        <h1 className="text-2xl font-semibold text-amber-900 dark:text-amber-100">
                            Active subscription required
                        </h1>
                        <p className="mt-2 text-amber-800 dark:text-amber-200">
                            Choose a package from Subscriptions before creating
                            a listing.
                        </p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Head title="Add Venue" />
            <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
                        Add New Venue
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                        Package: {subscription.package?.name} ·{' '}
                        {subscription.package?.max_listings} listings allowed
                    </p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                    <VenueForm
                        categories={categories}
                        features={features}
                        countries={countries}
                        submitLabel="Save as draft"
                    />
                </div>
            </div>
        </>
    );
}
