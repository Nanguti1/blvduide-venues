import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { Heart, Star } from 'lucide-react';
import VenueCard from '@/components/venue-card';
import { formatPrice } from '@/lib/money';
import venues from '@/routes/venues';

export default function VenueShow() {
    const { venue, related, isFavorited, approvedReviews, pendingReviews, auth } =
        usePage().props as any;

    const allReviews = [...(approvedReviews ?? []), ...(pendingReviews ?? [])];
    const coverImage = venue.media?.find((m: any) => m.collection_name === 'venue-cover');
    const galleryImages = venue.media?.filter((m: any) => m.collection_name === 'venue-gallery') ?? [];

    const reviewForm = useForm({
        rating: 5,
        comment: '',
    });

    const metaTitle = venue.meta_title ?? venue.title;
    const metaDescription =
        venue.meta_description ?? venue.short_description ?? venue.description;

    return (
        <>
            <Head title={metaTitle}>
                <meta head-key="description" name="description" content={metaDescription} />
                <meta head-key="og:title" property="og:title" content={metaTitle} />
                <meta head-key="og:description" property="og:description" content={metaDescription} />
                <meta head-key="og:type" property="og:type" content="website" />
            </Head>
            <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
                {/* Media Gallery Section - Product Page Style */}
                <section className="mb-12 grid gap-6 lg:grid-cols-[2fr_1fr]">
                    {/* Main Cover Image */}
                    <div className="overflow-hidden rounded-3xl bg-slate-200 dark:bg-slate-700">
                        {coverImage ? (
                            <img
                                src={coverImage.original_url}
                                alt={venue.title}
                                className="h-96 w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-96 items-center justify-center bg-slate-300 text-slate-500">
                                No cover image
                            </div>
                        )}
                    </div>

                    {/* Gallery Thumbnails */}
                    <div className="space-y-3">
                        {galleryImages.length > 0 ? (
                            galleryImages.slice(0, 4).map((image: any, idx: number) => (
                                <div key={image.id} className="overflow-hidden rounded-2xl">
                                    <img
                                        src={image.original_url}
                                        alt={`Gallery ${idx + 1}`}
                                        className="aspect-square w-full object-cover"
                                    />
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-slate-500">No gallery images</p>
                        )}
                    </div>
                </section>

                {/* Full Gallery Preview (if more than 4 images) */}
                {galleryImages.length > 4 && (
                    <section className="mb-12">
                        <h3 className="mb-4 text-lg font-semibold">Gallery</h3>
                        <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                            {galleryImages.map((image: any, idx: number) => (
                                <div key={image.id} className="overflow-hidden rounded-2xl">
                                    <img
                                        src={image.original_url}
                                        alt={`Gallery ${idx + 1}`}
                                        className="aspect-square w-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <section className="grid gap-8 lg:grid-cols-[1.5fr_0.9fr]">
                    <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                        <div className="space-y-3">
                            <p className="text-sm tracking-[0.24em] text-slate-500 uppercase">
                                {venue.category?.name}
                            </p>
                            <div className="flex items-start justify-between gap-4">
                                <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">
                                    {venue.title}
                                </h1>
                                {auth.user && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            router.post(
                                                `/venues/${venue.slug}/favorite`,
                                            )
                                        }
                                        className="rounded-full border border-slate-200 p-3 dark:border-slate-700"
                                    >
                                        <Heart
                                            className={`h-5 w-5 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`}
                                        />
                                    </button>
                                )}
                            </div>
                            <p className="text-slate-600 dark:text-slate-300">
                                {venue.short_description}
                            </p>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <p className="text-sm text-slate-500">Location</p>
                                <p className="font-medium text-slate-900 dark:text-white">
                                    {venue.locale?.name ?? venue.city?.name},{' '}
                                    {venue.country?.name}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Capacity</p>
                                <p className="font-medium text-slate-900 dark:text-white">
                                    {venue.capacity ?? 'N/A'}
                                </p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-slate-500">
                                Description
                            </p>
                            <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                                {venue.description}
                            </p>
                        </div>
                    </div>
                    <aside className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                        <div className="rounded-3xl bg-slate-950 p-6 text-white">
                            <p className="text-sm tracking-[0.24em] text-slate-400 uppercase">
                                Price
                            </p>
                            <p className="mt-3 text-4xl font-semibold">
                                {formatPrice(venue.price)}
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-yellow-500">
                            <Star className="h-5 w-5 fill-current" />
                            <span className="font-semibold text-slate-900 dark:text-white">
                                {Number(venue.average_rating ?? 0).toFixed(1)}
                            </span>
                            <span className="text-sm text-slate-500">
                                ({approvedReviews?.length ?? 0} reviews)
                            </span>
                        </div>
                        <div className="space-y-3">
                            <p className="text-sm tracking-[0.24em] text-slate-500 uppercase">
                                Amenities
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {venue.features?.map((feature: any) => (
                                    <span
                                        key={feature.id}
                                        className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                                    >
                                        {feature.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </aside>
                </section>

                <section className="mt-12 grid gap-8 lg:grid-cols-2">
                    <div>
                        <h2 className="mb-4 text-2xl font-semibold">Reviews ({allReviews?.length ?? 0})</h2>
                        <div className="space-y-4">
                            {allReviews && allReviews.length > 0 ? (
                                allReviews.map((review: any) => {
                                    const isUserReview = auth.user?.id === review.user_id;
                                    const isPending = review.status === 'pending' && isUserReview;
                                    return (
                                        <article
                                            key={review.id}
                                            className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700"
                                        >
                                            <div className="flex items-center gap-2">
                                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                <span className="font-medium">
                                                    {review.rating}/5
                                                </span>
                                                <span className="text-sm text-slate-500">
                                                    {review.user?.name}
                                                </span>
                                                {isPending && (
                                                    <span className="ml-auto inline-block rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
                                                        Pending Review
                                                    </span>
                                                )}
                                            </div>
                                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                                                {review.comment}
                                            </p>
                                        </article>
                                    );
                                })
                            ) : (
                                <p className="text-slate-500">No reviews yet. Be the first to review!</p>
                            )}
                        </div>
                    </div>
                    {auth.user && (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                reviewForm.post(
                                    `/venues/${venue.slug}/reviews`,
                                );
                            }}
                            className="rounded-3xl border border-slate-200 p-6 dark:border-slate-700"
                        >
                            <h3 className="font-semibold">Leave a review</h3>
                            <select
                                value={reviewForm.data.rating}
                                onChange={(e) =>
                                    reviewForm.setData(
                                        'rating',
                                        Number(e.target.value),
                                    )
                                }
                                className="mt-4 w-full rounded-2xl border px-4 py-3 dark:border-slate-700 dark:bg-slate-950"
                            >
                                {[5, 4, 3, 2, 1].map((n) => (
                                    <option key={n} value={n}>
                                        {n} stars
                                    </option>
                                ))}
                            </select>
                            <textarea
                                value={reviewForm.data.comment}
                                onChange={(e) =>
                                    reviewForm.setData('comment', e.target.value)
                                }
                                rows={4}
                                placeholder="Share your experience..."
                                className="mt-4 w-full rounded-2xl border px-4 py-3 dark:border-slate-700 dark:bg-slate-950"
                            />
                            <button
                                type="submit"
                                disabled={reviewForm.processing}
                                className="mt-4 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                            >
                                Submit review
                            </button>
                        </form>
                    )}
                </section>

                <section className="mt-12">
                    <h2 className="mb-4 text-2xl font-semibold">Related spaces</h2>
                    <div className="grid gap-4 md:grid-cols-2">
                        {related?.map((item: any) => (
                            <VenueCard key={item.id} venue={item} />
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
}
