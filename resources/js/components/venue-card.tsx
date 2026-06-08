import { Link } from '@inertiajs/react';
import { Star } from 'lucide-react';
import { htmlToPlainText, HtmlContent } from '@/lib/html';
import { formatPrice } from '@/lib/money';
import venues from '@/routes/venues';

export default function VenueCard({ venue }: { venue: any }) {
    const coverImage = venue.media?.find(
        (m: any) => m.collection_name === 'venue-cover',
    );
    const description = venue.short_description || venue.description;

    return (
        <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900">
            <div className="overflow-hidden bg-slate-100 dark:bg-slate-800">
                {coverImage ? (
                    <img
                        src={coverImage.original_url}
                        alt={venue.title}
                        className="h-52 w-full object-cover"
                    />
                ) : (
                    <div className="flex h-52 items-center justify-center px-4 text-center text-sm text-slate-500 dark:text-slate-400">
                        No cover image available
                    </div>
                )}
            </div>
            <div className="p-6">
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
                {description ? (
                    <HtmlContent
                        html={description}
                        aria-label={htmlToPlainText(description)}
                        className="mb-4 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300 [&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_b]:font-semibold [&_p:not(:last-child)]:mb-2 [&_strong]:font-semibold"
                    />
                ) : null}
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
                            {formatPrice(venue.price)}
                        </p>
                    </div>
                    <Link
                        href={venues.show.url(venue.slug)}
                        className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                    >
                        View
                    </Link>
                </div>
            </div>
        </article>
    );
}
