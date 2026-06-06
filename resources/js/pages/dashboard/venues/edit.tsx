import { Head } from '@inertiajs/react';
import VenueForm from '@/components/venue/venue-form';

export default function DashboardVenueEdit({
    venue,
    categories,
    features,
    countries,
}: any) {
    return (
        <>
            <Head title="Edit Venue" />
            <div className="w-full px-4 py-10 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
                        Edit Listing
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                        Status: {venue.approval_status}
                    </p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                    <VenueForm
                        venue={venue}
                        categories={categories}
                        features={features}
                        countries={countries}
                        submitLabel="Update venue"
                    />
                </div>
            </div>
        </>
    );
}
