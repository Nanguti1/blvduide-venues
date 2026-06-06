import { Head } from '@inertiajs/react';

export default function Contact() {
    return (
        <>
            <Head title="Contact Us" />
            <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">
                    Contact Us
                </h1>
                <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
                    Have questions about listing your venue or finding the
                    perfect space? Reach out to our team.
                </p>
                <div className="mt-8 space-y-4 rounded-3xl border border-slate-200 bg-white p-8 dark:border-slate-700 dark:bg-slate-900">
                    <p>
                        <span className="font-medium">Email:</span>{' '}
                        hello@blvdguide.test
                    </p>
                    <p>
                        <span className="font-medium">Phone:</span> +254 700
                        000 000
                    </p>
                    <p>
                        <span className="font-medium">Hours:</span> Mon–Fri,
                        9am–6pm EAT
                    </p>
                </div>
            </div>
        </>
    );
}
