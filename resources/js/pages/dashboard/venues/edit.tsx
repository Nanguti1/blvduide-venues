import { Head, router } from '@inertiajs/react';
import VenueForm from '@/components/venue/venue-form';
import { toast } from '@/components/ui/sonner';
import dashboardVenues from '@/routes/dashboard/venues';

export default function DashboardVenueEdit({
    venue,
    categories,
    features,
    countries,
}: any) {
    function handleDelete() {
        if (!window.confirm('Are you sure you want to delete this venue? This cannot be undone.')) {
            return;
        }

        router.delete(dashboardVenues.destroy.url(venue.slug), {
            onSuccess: () => toast.success('Venue deleted successfully.'),
            onError: () => toast.error('Failed to delete venue. Please try again.'),
        });
    }

    return (
        <>
            <Head title="Edit Venue" />
            <div className="w-full px-4 py-10 sm:px-6 lg:px-8">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
                            Edit Listing
                        </h1>
                        <p className="mt-2 text-sm text-slate-500">
                            Status: {venue.approval_status}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="rounded-full bg-destructive px-4 py-2 text-sm font-semibold text-white transition hover:bg-destructive/90"
                    >
                        Delete Venue
                    </button>
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
