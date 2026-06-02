import { Link } from '@inertiajs/react';
import { Star } from 'lucide-react';

export default function VenueCard({ venue }: { venue: any }) {
    return (
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900">
            <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                        {venue.title}
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        {venue.category?.name}
                    </p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-slate-700 uppercase dark:bg-slate-800 dark:text-slate-300">
                    {venue.featured ? 'Featured' : 'Standard'}
                </span>
            </div>
            <p className="mb-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {venue.short_description}
            </p>
            <div className="mb-4 flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                <span>{venue.city?.name ?? venue.locale?.name}</span>
                <span>•</span>
                <span>{venue.capacity ?? 'N/A'} capacity</span>
            </div>
            <div className="mb-4 flex items-center gap-2 text-yellow-500">
                <Star className="h-4 w-4" />
                <span>{venue.average_rating?.toFixed?.(1) ?? '0.0'}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
                <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        From
                    </p>
                    <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                        ${venue.price ?? 'Contact'}
                    </p>
                </div>
                <Link
                    href={route('venues.show', venue.slug)}
                    className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
                >
                    View
                </Link>
            </div>
        </article>
    );
}
