import { Head } from '@inertiajs/react';

export default function About() {
    return (
        <>
            <Head title="About Us" />
            <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">
                    About BlvdGuide
                </h1>
                <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
                    BlvdGuide is a venue marketplace built for event planners,
                    businesses, and creatives who need exceptional spaces. From
                    coworking studios to wedding gardens, we connect hosts with
                    the right venues through curated listings, transparent
                    pricing, and trusted reviews.
                </p>
                <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">
                    Our platform supports subscription-based listing packages,
                    admin moderation, and advanced discovery tools — designed to
                    scale with your business.
                </p>
            </div>
        </>
    );
}
