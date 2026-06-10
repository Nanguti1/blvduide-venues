import { usePage } from '@inertiajs/react';
import PublicHeader from '@/components/public-header';

function getPageTitle(component: string) {
    const titles: Record<string, string> = {
        about: 'About Us',
        contact: 'Contact Us',
        'venues/index': 'Venues',
        'venues/show': 'Venue Details',
        'venues/categories/show': 'Venue Category',
    };

    return (
        titles[component] ||
        component
            .split('/')
            .map((segment) =>
                segment
                    .replace(/-/g, ' ')
                    .replace(/\b\w/g, (char) => char.toUpperCase()),
            )
            .join(' ')
    );
}

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const page = usePage();
    const isHome = page.component === 'home';
    const pageTitle = getPageTitle(page.component);

    return (
        <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
            <PublicHeader />
            {!isHome && (
                <section className="relative overflow-hidden border-b border-slate-200 bg-slate-50/90 dark:border-slate-800 dark:bg-slate-950/80">
                    <img
                        src="/wedding-venues-hero-section-banner.jpg"
                        alt="Page hero background"
                        className="absolute inset-0 h-full w-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/60 to-slate-950/20" />
                    <div className="relative mx-auto flex max-h-[300px] min-h-[220px] items-end px-4 py-6 sm:px-6 lg:px-8">
                        <div>
                            <p className="text-sm tracking-[0.35em] text-white/70 uppercase">
                                Venue Marketplace
                            </p>
                            <h1 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                                {pageTitle}
                            </h1>
                        </div>
                    </div>
                </section>
            )}
            <main className="flex-1">{children}</main>
            <footer className="border-t border-slate-200 bg-slate-50 text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
                <div className="max-w-8xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
                    <div className="grid gap-8 lg:grid-cols-[1.5fr_repeat(3,minmax(0,1fr))]">
                        <div className="rounded-4xl bg-linear-to-br from-sky-600 to-cyan-500 p-8 text-white shadow-xl shadow-slate-900/10">
                            <h2 className="text-2xl font-semibold">
                                BLVD GUIDE
                            </h2>
                            <p className="mt-4 text-sm leading-7 text-white/90">
                                Venue marketplace connecting hosts with clients
                                seeking memorable event spaces across Kenya.
                                Manage subscriptions, showcase your venue, and
                                reach trusted customers.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold tracking-[0.3em] text-slate-900 uppercase dark:text-slate-100">
                                Marketplace
                            </h3>
                            <ul className="mt-4 space-y-3 text-sm">
                                <li>
                                    <a
                                        href="/about"
                                        className="text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                                    >
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/venues"
                                        className="text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                                    >
                                        Venues
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/venues"
                                        className="text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                                    >
                                        Categories
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                                    >
                                        Blog
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold tracking-[0.3em] text-slate-900 uppercase dark:text-slate-100">
                                Account
                            </h3>
                            <ul className="mt-4 space-y-3 text-sm">
                                <li>
                                    <a
                                        href="/contact"
                                        className="text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                                    >
                                        Help & Support
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                                    >
                                        Subscriptions
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                                    >
                                        My Listings
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                                    >
                                        Wishlist
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold tracking-[0.3em] text-slate-900 uppercase dark:text-slate-100">
                                Contact
                            </h3>
                            <ul className="mt-4 space-y-3 text-sm">
                                <li className="text-slate-600 dark:text-slate-400">
                                    Nairobi, Kenya
                                </li>
                                <li>
                                    <a
                                        href="mailto:support@blvdguide.com"
                                        className="text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                                    >
                                        support@blvdguide.com
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="tel:+254707199880"
                                        className="text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                                    >
                                        +254-707-199-880
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="border-t border-slate-200/70 bg-slate-100 px-4 py-4 text-sm text-slate-500 sm:px-6 lg:px-8 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
                    <div className="mx-auto flex flex-col items-center justify-between gap-3 sm:flex-row">
                        <p>
                            Copyright © {new Date().getFullYear()} BLVD GUIDE.
                            All rights reserved.
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                            <span>Payment:</span>
                            <span>Mpesa</span>
                            <span className="text-slate-400">|</span>
                            <span>Bank Transfer</span>
                            <span className="text-slate-400">|</span>
                            <span>Card</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
