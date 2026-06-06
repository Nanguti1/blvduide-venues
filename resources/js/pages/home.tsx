import { Head, Link, router, usePage } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import { Search, Star } from 'lucide-react';
import InputError from '@/components/input-error';
import VenueCard from '@/components/venue-card';
import { formatPrice } from '@/lib/money';
import venues from '@/routes/venues';

export default function Home({
    featuredVenues,
    latestVenues,
    categories,
}: {
    featuredVenues: any[];
    latestVenues: any[];
    categories: any[];
}) {
    const [category, setCategory] = useState('');
    const [capacity, setCapacity] = useState('');
    const [query, setQuery] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [message, setMessage] = useState('');
    const { errors } = usePage().props as { errors: any };
    const spotlightVenue = featuredVenues[0] ?? latestVenues[0] ?? null;

    function search(e: FormEvent) {
        e.preventDefault();

        const params: Record<string, string> = {};

        if (query) {
            params.q = query;
        }
        if (category) {
            params.category = category;
        }
        if (capacity) {
            params.capacity = capacity;
        }

        router.get(venues.index.url(), params);
    }

    function submitInquiry(e: FormEvent) {
        e.preventDefault();

        router.post('/contact', {
            first_name: firstName,
            last_name: lastName,
            email,
            zip_code: zipCode,
            message,
        });
    }

    return (
        <>
            <Head title="Find Your Perfect Venue" />

            <section className="relative min-h-screen overflow-hidden text-white">
                <img
                    src="/wedding-venues-hero-section-banner.jpg"
                    alt="Wedding venues hero background"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                <div className="relative mx-auto flex min-h-screen max-w-8xl flex-col px-4 pb-10 pt-28 sm:px-6 lg:px-8">
                    <div className="max-w-2xl">
                        <p className="text-sm tracking-[0.3em] text-white/70 uppercase">
                            BLVD GUIDE Marketplace
                        </p>
                        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                            Built on legacy. Designed for life.
                        </h1>
                        <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85">
                            Discover exceptional venues across Kenya — from
                            coworking lofts and wedding gardens to conference
                            halls curated for memorable experiences.
                        </p>
                        <div className="mt-6 flex items-center gap-3 text-white/90">
                            <div className="flex gap-0.5">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <Star
                                        key={index}
                                        className="h-4 w-4 fill-white text-white"
                                    />
                                ))}
                            </div>
                            <span className="text-sm">
                                Trusted venue marketplace
                            </span>
                        </div>
                    </div>

                    <div className="mt-auto flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <form
                            onSubmit={search}
                            className="w-full max-w-2xl rounded-2xl border border-white/10 bg-black/55 p-5 backdrop-blur-md sm:p-6"
                        >
                            <div className="grid gap-4 sm:grid-cols-3">
                                <label className="space-y-2">
                                    <span className="text-xs font-semibold tracking-[0.2em] text-white/60 uppercase">
                                        Type
                                    </span>
                                    <select
                                        value={category}
                                        onChange={(e) =>
                                            setCategory(e.target.value)
                                        }
                                        className="w-full rounded-xl border-0 bg-white/10 px-4 py-3 text-sm text-white outline-none"
                                    >
                                        <option value="" className="text-black">
                                            All
                                        </option>
                                        {categories.map((item) => (
                                            <option
                                                key={item.id}
                                                value={item.slug}
                                                className="text-black"
                                            >
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                <label className="space-y-2">
                                    <span className="text-xs font-semibold tracking-[0.2em] text-white/60 uppercase">
                                        Capacity
                                    </span>
                                    <select
                                        value={capacity}
                                        onChange={(e) =>
                                            setCapacity(e.target.value)
                                        }
                                        className="w-full rounded-xl border-0 bg-white/10 px-4 py-3 text-sm text-white outline-none"
                                    >
                                        <option value="" className="text-black">
                                            Any
                                        </option>
                                        <option value="50" className="text-black">
                                            Up to 50
                                        </option>
                                        <option value="100" className="text-black">
                                            Up to 100
                                        </option>
                                        <option value="250" className="text-black">
                                            Up to 250
                                        </option>
                                        <option value="500" className="text-black">
                                            500+
                                        </option>
                                    </select>
                                </label>
                                <label className="space-y-2">
                                    <span className="text-xs font-semibold tracking-[0.2em] text-white/60 uppercase">
                                        Keyword
                                    </span>
                                    <input
                                        value={query}
                                        onChange={(e) =>
                                            setQuery(e.target.value)
                                        }
                                        placeholder="Search venues..."
                                        className="w-full rounded-xl border-0 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none"
                                    />
                                </label>
                            </div>
                            <button
                                type="submit"
                                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                            >
                                <Search className="h-4 w-4" />
                                Search
                            </button>
                        </form>

                        {spotlightVenue ? (
                            <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-black/55 p-5 backdrop-blur-md">
                                <div className="mb-3 flex items-center gap-2">
                                    <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                                        Just Listed
                                    </span>
                                    {spotlightVenue.featured ? (
                                        <span className="text-xs tracking-[0.2em] text-white/60 uppercase">
                                            Featured
                                        </span>
                                    ) : null}
                                </div>
                                <h3 className="text-2xl font-semibold">
                                    {spotlightVenue.title}
                                </h3>
                                <p className="mt-2 text-3xl font-bold">
                                    {formatPrice(spotlightVenue.price)}
                                </p>
                                <Link
                                    href={venues.show.url(spotlightVenue.slug)}
                                    className="mt-4 inline-flex text-sm font-medium text-primary hover:text-primary/80"
                                >
                                    View Details →
                                </Link>
                            </div>
                        ) : null}
                    </div>
                </div>
            </section>

            {/* inquiry section moved closer to CTA */}

            <section className="mx-auto max-w-8xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mb-8 flex items-end justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold text-foreground">
                            Featured venues
                        </h2>
                        <p className="mt-2 text-muted-foreground">
                            Hand-picked spaces with premium visibility
                        </p>
                    </div>
                    <Link
                        href={venues.index.url({ query: { featured: '1' } })}
                        className="text-sm font-medium text-foreground underline"
                    >
                        View all featured
                    </Link>
                </div>
                {featuredVenues.length ? (
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {featuredVenues.map((venue) => (
                            <VenueCard key={venue.id} venue={venue} />
                        ))}
                    </div>
                ) : (
                    <p className="text-muted-foreground">
                        Featured venues will appear here once listings are
                        published.
                    </p>
                )}
            </section>

            <section className="bg-muted/40 py-16">
                <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                    <h2 className="mb-8 text-2xl font-semibold text-foreground">
                        Popular categories
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {categories.map((categoryItem) => (
                            <Link
                                key={categoryItem.id}
                                href={venues.categories.show.url(
                                    categoryItem.slug,
                                )}
                                className="rounded-3xl border border-border bg-background p-6 transition hover:-translate-y-1 hover:shadow-lg"
                            >
                                <p className="text-lg font-semibold text-foreground">
                                    {categoryItem.name}
                                </p>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    Browse {categoryItem.name.toLowerCase()}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-8xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mb-8 flex items-end justify-between">
                    <h2 className="text-2xl font-semibold text-foreground">
                        Latest venues
                    </h2>
                    <Link
                        href={venues.index.url()}
                        className="text-sm font-medium text-foreground underline"
                    >
                        Browse all
                    </Link>
                </div>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {latestVenues.map((venue) => (
                        <VenueCard key={venue.id} venue={venue} />
                    ))}
                </div>
            </section>


            {/* Insert inquiry form immediately before the CTA */}
            <section className="relative overflow-hidden bg-slate-950/5 text-slate-900 dark:bg-slate-900/70 dark:text-white">
                <img
                    src="/weddings-in-Zen-garden.jpg"
                    alt="Wedding inquiry section background"
                    className="absolute inset-0 h-full w-full object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-slate-950/60" />
                <div className="relative mx-auto max-w-8xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
                        <div className="max-w-xl">
                            <p className="text-sm uppercase tracking-[0.3em] text-white/70">
                                Please Send Us Your Inquiry
                            </p>
                            <h2 className="mt-4 text-4xl font-bold text-white sm:text-5xl">
                                We typically reply within 24 hours.
                            </h2>
                            <p className="mt-4 max-w-xl text-sm leading-7 text-white/80 sm:text-base">
                                Tell us what you need for your wedding or event and we will help match you with the perfect venue.
                            </p>
                        </div>
                        <div className="rounded-4xl border border-white/15 bg-white/95 p-8 shadow-2xl backdrop-blur-xl dark:bg-slate-900/95">
                            <form onSubmit={submitInquiry} className="space-y-4">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <label className="block">
                                        <input
                                            type="text"
                                            value={firstName}
                                            onChange={(event) => setFirstName(event.target.value)}
                                            placeholder="First Name"
                                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                                        />
                                        <InputError message={errors.first_name} className="mt-2" />
                                    </label>
                                    <label className="block">
                                        <input
                                            type="text"
                                            value={lastName}
                                            onChange={(event) => setLastName(event.target.value)}
                                            placeholder="Last Name"
                                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                                        />
                                        <InputError message={errors.last_name} className="mt-2" />
                                    </label>
                                </div>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <label className="block">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(event) => setEmail(event.target.value)}
                                            placeholder="Email address"
                                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                                        />
                                        <InputError message={errors.email} className="mt-2" />
                                    </label>
                                    <label className="block">
                                        <input
                                            type="text"
                                            value={zipCode}
                                            onChange={(event) => setZipCode(event.target.value)}
                                            placeholder="Zip Code"
                                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                                        />
                                        <InputError message={errors.zip_code} className="mt-2" />
                                    </label>
                                </div>
                                <label className="block">
                                    <textarea
                                        value={message}
                                        onChange={(event) => setMessage(event.target.value)}
                                        placeholder="Please type your message here..."
                                        rows={5}
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                                    />
                                    <InputError message={errors.message} className="mt-2" />
                                </label>
                                <button
                                    type="submit"
                                    className="inline-flex w-full items-center justify-center rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                                >
                                    Submit Inquiry
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-8xl px-4 pb-20 pt-20 sm:px-6 lg:px-8">
                <div className="rounded-[2rem] bg-black px-8 py-12 text-center text-white">
                    <h2 className="text-3xl font-semibold">
                        List your venue on BLVD GUIDE
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-white/70">
                        Join our marketplace, choose a subscription package, and
                        reach clients looking for premium spaces.
                    </p>
                    <Link
                        href="/register"
                        className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                    >
                        Get started
                    </Link>
                </div>
            </section>
        </>
    );
}
