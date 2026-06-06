import { Link, usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { dashboard, login, register } from '@/routes';
import venues from '@/routes/venues';
import type { Auth } from '@/types/auth';

type SharedCategory = {
    id: number;
    name: string;
    slug: string;
    icon?: string | null;
};

export default function PublicHeader() {
    const { auth, navCategories = [] } = usePage().props as {
        auth: Auth;
        navCategories?: SharedCategory[];
    };
    const [mobileOpen, setMobileOpen] = useState(false);
    const [categoriesOpen, setCategoriesOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                <Link
                    href="/"
                    className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white"
                >
                    BlvdGuide
                </Link>

                <nav className="hidden items-center gap-6 md:flex">
                    <div
                        className="relative"
                        onMouseEnter={() => setCategoriesOpen(true)}
                        onMouseLeave={() => setCategoriesOpen(false)}
                    >
                        <button
                            type="button"
                            className="text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                        >
                            Categories
                        </button>
                        {categoriesOpen && (
                            <div className="absolute left-0 top-full z-50 mt-2 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-700 dark:bg-slate-900">
                                {navCategories.map((category) => (
                                    <Link
                                        key={category.id}
                                        href={venues.categories.show.url(
                                            category.slug,
                                        )}
                                        className="block rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                                    >
                                        {category.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                    <Link
                        href={venues.index.url()}
                        className="text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                    >
                        All Venues
                    </Link>
                    <Link
                        href="/about"
                        className="text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                    >
                        About
                    </Link>
                    <Link
                        href="/contact"
                        className="text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                    >
                        Contact
                    </Link>
                </nav>

                <div className="hidden items-center gap-3 md:flex">
                    {auth.user ? (
                        <Link
                            href={dashboard()}
                            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={login()}
                                className="text-sm font-medium text-slate-600 dark:text-slate-300"
                            >
                                Log in
                            </Link>
                            <Link
                                href={register()}
                                className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

                <button
                    type="button"
                    className="md:hidden"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <Menu className="h-6 w-6" />
                    )}
                </button>
            </div>

            {mobileOpen && (
                <div className="border-t border-slate-200 px-4 py-4 md:hidden dark:border-slate-800">
                    <div className="flex flex-col gap-3">
                        <Link href={venues.index.url()}>All Venues</Link>
                        <Link href="/about">About</Link>
                        <Link href="/contact">Contact</Link>
                        {auth.user ? (
                            <Link href={dashboard()}>Dashboard</Link>
                        ) : (
                            <>
                                <Link href={login()}>Log in</Link>
                                <Link href={register()}>Register</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
