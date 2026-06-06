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
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
            <PublicHeader />
            {!isHome && (
                <section className="border-b border-slate-200 bg-slate-50/90 py-5 text-slate-900 dark:border-slate-800 dark:bg-slate-950/80 dark:text-slate-100">
                    <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
                            {pageTitle}
                        </h1>
                    </div>
                </section>
            )}
            <main className="flex-1">{children}</main>
            <footer className="border-t border-slate-200 bg-slate-50 text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
                <div className="mx-auto max-w-8xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="grid gap-8 lg:grid-cols-[1.5fr_repeat(3,minmax(0,1fr))]">
                        <div className="rounded-[2rem] bg-gradient-to-br from-sky-600 to-cyan-500 p-8 text-white shadow-xl shadow-slate-900/10">
                            <h2 className="text-2xl font-semibold">BLVD GUIDE</h2>
                            <p className="mt-4 text-sm leading-7 text-white/90">
                                Venue marketplace connecting hosts with clients seeking memorable event spaces across Kenya. Manage subscriptions, showcase your venue, and reach trusted customers.
                            </p>
                            <div className="mt-6 space-y-1 text-sm text-white/90">
                                <p className="font-semibold">Our Office</p>
                                <p>Nairobi, Kenya</p>
                                <p>support@blvdguide.test</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-900 dark:text-slate-100">
                                Marketplace
                            </h3>
                            <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-400">
                                <li>About</li>
                                <li>Venues</li>
                                <li>Categories</li>
                                <li>Blog</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-900 dark:text-slate-100">
                                Account
                            </h3>
                            <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-400">
                                <li>Help & Support</li>
                                <li>Subscriptions</li>
                                <li>My Listings</li>
                                <li>Wishlist</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-900 dark:text-slate-100">
                                Mobile App
                            </h3>
                            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                                Download the BLVD GUIDE app to manage listings on the go.
                            </p>
                            <div className="mt-5 space-y-3">
                                <div className="rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
                                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Get it on</p>
                                    <p className="mt-1 font-semibold">Google Play</p>
                                </div>
                                <div className="rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
                                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Download on the</p>
                                    <p className="mt-1 font-semibold">App Store</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-t border-slate-200/70 bg-slate-100 px-4 py-4 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 sm:px-6 lg:px-8">
                    <div className="mx-auto flex flex-col items-center justify-between gap-3 sm:flex-row">
                        <p>
                            Copyright © {new Date().getFullYear()} BLVD GUIDE. All rights reserved.
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
