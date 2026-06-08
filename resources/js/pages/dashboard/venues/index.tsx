import { Head, Link, router } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import FilterBar from '@/components/dashboard/filter-bar';
import DashboardPageShell from '@/components/dashboard-page-shell';
import Pagination from '@/components/pagination';
import dashboardVenues from '@/routes/dashboard/venues';
import { formatPrice } from '@/lib/money';

export default function DashboardVenuesIndex({
    venues,
    filters = {},
    categories = [],
}: {
    venues: any;
    filters?: any;
    categories?: any[];
}) {
    const [selectedVenueIds, setSelectedVenueIds] = useState<number[]>([]);
    const visibleVenueIds = useMemo(
        () => venues.data?.map((venue: any) => venue.id) ?? [],
        [venues.data],
    );
    const allVisibleSelected =
        visibleVenueIds.length > 0 &&
        visibleVenueIds.every((venueId: number) =>
            selectedVenueIds.includes(venueId),
        );

    function toggleVenue(venueId: number) {
        setSelectedVenueIds((current) =>
            current.includes(venueId)
                ? current.filter((selectedId) => selectedId !== venueId)
                : [...current, venueId],
        );
    }

    function toggleVisibleVenues() {
        setSelectedVenueIds((current) => {
            if (allVisibleSelected) {
                return current.filter(
                    (venueId) => !visibleVenueIds.includes(venueId),
                );
            }

            return Array.from(new Set([...current, ...visibleVenueIds]));
        });
    }

    function bulkDelete() {
        if (!selectedVenueIds.length) {
            return;
        }

        if (
            !window.confirm(
                `Delete ${selectedVenueIds.length} selected venue${selectedVenueIds.length === 1 ? '' : 's'}? This cannot be undone.`,
            )
        ) {
            return;
        }

        router.delete('/dashboard/venues/bulk-delete', {
            data: { venue_ids: selectedVenueIds },
            preserveScroll: true,
            onSuccess: () => setSelectedVenueIds([]),
        });
    }

    return (
        <>
            <Head title="My Venues" />
            <DashboardPageShell
                title="My Listings"
                description="Manage your venue inventory, approval status, and submission workflow."
                action={
                    <div className="flex flex-wrap items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={bulkDelete}
                            disabled={!selectedVenueIds.length}
                            className="inline-flex items-center justify-center rounded-full bg-destructive px-5 py-3 text-sm font-semibold text-white transition hover:bg-destructive/90 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Delete selected
                            {selectedVenueIds.length
                                ? ` (${selectedVenueIds.length})`
                                : ''}
                        </button>
                        <Link
                            href={dashboardVenues.create.url()}
                            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                        >
                            Add Venue
                        </Link>
                    </div>
                }
            >
                <FilterBar
                    filters={filters}
                    fields={[
                        {
                            label: 'Search',
                            name: 'q',
                            placeholder: 'Venue name',
                        },
                        {
                            label: 'Featured',
                            name: 'featured',
                            type: 'select',
                            options: [
                                { label: 'Featured', value: '1' },
                                { label: 'Not featured', value: '0' },
                            ],
                        },
                        {
                            label: 'Category',
                            name: 'category',
                            type: 'select',
                            options: categories.map((category: any) => ({
                                label: category.name,
                                value: category.id,
                            })),
                        },
                        {
                            label: 'Location',
                            name: 'location',
                            placeholder: 'Country, city, locale',
                        },
                        {
                            label: 'Status',
                            name: 'status',
                            type: 'select',
                            options: [
                                { label: 'Draft', value: 'draft' },
                                { label: 'Pending', value: 'pending' },
                                { label: 'Published', value: 'published' },
                                { label: 'Rejected', value: 'rejected' },
                            ],
                        },
                    ]}
                />
                <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
                    <table className="min-w-full divide-y divide-border text-left text-sm">
                        <thead className="bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-200">
                            <tr>
                                <th className="w-12 px-6 py-4 font-semibold">
                                    <input
                                        type="checkbox"
                                        checked={allVisibleSelected}
                                        onChange={toggleVisibleVenues}
                                        aria-label="Select all venues on this page"
                                        className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                                    />
                                </th>
                                <th className="px-6 py-4 font-semibold">
                                    Title
                                </th>
                                <th className="px-6 py-4 font-semibold">
                                    Category
                                </th>
                                <th className="px-6 py-4 font-semibold">
                                    Location
                                </th>
                                <th className="px-6 py-4 font-semibold">
                                    Price
                                </th>
                                <th className="px-6 py-4 font-semibold">
                                    Status
                                </th>
                                <th className="px-6 py-4 font-semibold">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border bg-white dark:bg-slate-950">
                            {venues.data?.map((venue: any) => (
                                <tr
                                    key={venue.id}
                                    className="hover:bg-slate-50 dark:hover:bg-slate-900"
                                >
                                    <td className="px-6 py-4 align-top">
                                        <input
                                            type="checkbox"
                                            checked={selectedVenueIds.includes(
                                                venue.id,
                                            )}
                                            onChange={() =>
                                                toggleVenue(venue.id)
                                            }
                                            aria-label={`Select ${venue.title}`}
                                            className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                                        />
                                    </td>
                                    <td className="px-6 py-4 align-top">
                                        <p className="font-semibold text-slate-900 dark:text-slate-100">
                                            {venue.title}
                                        </p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">
                                            {venue.short_description}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4 align-top text-slate-600 dark:text-slate-300">
                                        {venue.category?.name}
                                    </td>
                                    <td className="px-6 py-4 align-top text-slate-600 dark:text-slate-300">
                                        {venue.city?.name ??
                                            venue.locale?.name ??
                                            '–'}
                                        , {venue.country?.name ?? '–'}
                                    </td>
                                    <td className="px-6 py-4 align-top text-slate-600 dark:text-slate-300">
                                        {venue.price
                                            ? formatPrice(venue.price)
                                            : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 align-top text-slate-600 dark:text-slate-300">
                                        {venue.approval_status}
                                    </td>
                                    <td className="px-6 py-4 text-right align-top">
                                        <div className="flex flex-wrap justify-end gap-2">
                                            <Link
                                                href={dashboardVenues.edit.url(
                                                    venue.slug,
                                                )}
                                                className="rounded-full border border-border px-4 py-2 text-sm transition hover:bg-muted"
                                            >
                                                Edit
                                            </Link>
                                            <Link
                                                href={dashboardVenues.submit.url(
                                                    venue.slug,
                                                )}
                                                method="patch"
                                                as="button"
                                                className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                                            >
                                                Submit
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination resource={venues} />
            </DashboardPageShell>
        </>
    );
}
