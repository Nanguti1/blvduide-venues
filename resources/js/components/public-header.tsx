import { Link, usePage } from '@inertiajs/react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { dashboard, login, register } from '@/routes';
import venues from '@/routes/venues';
import { cn } from '@/lib/utils';
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
    const isHome = usePage().url === '/';
    const [mobileOpen, setMobileOpen] = useState(false);
    const [categoriesOpen, setCategoriesOpen] = useState(false);

    const navLinkClass =
        'inline-flex items-center rounded-full px-4 py-2 text-sm font-medium text-white/90 transition hover:text-white hover:bg-white/10';
    const standardNavLinkClass =
        'inline-flex items-center rounded-full px-3 py-2 text-sm font-medium text-foreground/80 transition hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800';

    return (
        <header
            className={cn(
                'z-50 w-full',
                isHome
                    ? 'absolute top-0 left-0 pt-4 sm:pt-6'
                    : 'sticky top-0 border-b border-border/60 bg-background/90 backdrop-blur-md',
            )}
        >
            <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                <div
                    className={cn(
                        'flex items-center justify-between gap-4',
                        isHome &&
                            'rounded-full border border-white/20 bg-white/10 px-4 py-3 shadow-lg backdrop-blur-xl sm:px-6',
                    )}
                >
                    <Link
                        href="/"
                        className={cn(
                            'text-lg font-bold tracking-wide uppercase',
                            isHome ? 'text-white' : 'text-foreground',
                        )}
                    >
                        BLVD GUIDE
                    </Link>

                    <nav className="hidden items-center gap-5 lg:flex">
                        <Link
                            href="/"
                            className={cn(
                                isHome ? navLinkClass : standardNavLinkClass,
                                isHome && 'bg-white/15 text-white',
                            )}
                        >
                            Home
                        </Link>
                        <div
                            className="relative"
                            onMouseEnter={() => setCategoriesOpen(true)}
                            onMouseLeave={() => setCategoriesOpen(false)}
                        >
                            <button
                                type="button"
                                className={cn(
                                    'inline-flex items-center gap-1',
                                    isHome ? navLinkClass : standardNavLinkClass,
                                )}
                            >
                                Categories
                                <ChevronDown className="h-4 w-4" />
                            </button>
                            {categoriesOpen && (
                                <div className="absolute left-0 top-full z-50 mt-2 w-56 rounded-2xl border border-border bg-background p-2 shadow-lg">
                                    {navCategories.map((category) => (
                                        <Link
                                            key={category.id}
                                            href={venues.categories.show.url(
                                                category.slug,
                                            )}
                                            className="block rounded-xl px-3 py-2 text-sm text-foreground hover:bg-muted"
                                        >
                                            {category.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                        <Link
                            href={venues.index.url()}
                            className={isHome ? navLinkClass : standardNavLinkClass}
                        >
                            Venues
                        </Link>
                        <Link
                            href="/about"
                            className={isHome ? navLinkClass : standardNavLinkClass}
                        >
                            About
                        </Link>
                        <Link
                            href="/contact"
                            className={isHome ? navLinkClass : standardNavLinkClass}
                        >
                            Contact
                        </Link>
                    </nav>

                    <div className="hidden items-center gap-3 md:flex">
                        <span
                            className={cn(
                                'text-sm font-medium',
                                isHome ? 'text-white/90' : 'text-foreground/70',
                            )}
                        >
                            Kes
                        </span>
                        <span
                            className={cn(
                                'text-sm font-medium',
                                isHome ? 'text-white/90' : 'text-foreground/70',
                            )}
                        >
                            EN
                        </span>
                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="rounded-full bg-black px-5 py-2 text-sm font-semibold text-white transition hover:bg-black/80"
                            >
                                My Account
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className={
                                        isHome
                                            ? navLinkClass
                                            : standardNavLinkClass
                                    }
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={register()}
                                    className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>

                    <button
                        type="button"
                        className={cn(
                            'lg:hidden',
                            isHome ? 'text-white' : 'text-foreground',
                        )}
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
            </div>

            {mobileOpen && (
                <div
                    className={cn(
                        'border-t px-4 py-4 lg:hidden',
                        isHome
                            ? 'border-white/20 bg-black/60 backdrop-blur-xl'
                            : 'border-border bg-background',
                    )}
                >
                    <div className="flex flex-col gap-3">
                        <Link
                            href="/"
                            className={isHome ? 'text-white' : 'text-foreground'}
                        >
                            Home
                        </Link>
                        <Link
                            href={venues.index.url()}
                            className={isHome ? 'text-white' : 'text-foreground'}
                        >
                            Venues
                        </Link>
                        <Link
                            href="/about"
                            className={isHome ? 'text-white' : 'text-foreground'}
                        >
                            About
                        </Link>
                        <Link
                            href="/contact"
                            className={isHome ? 'text-white' : 'text-foreground'}
                        >
                            Contact
                        </Link>
                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className={isHome ? 'text-white' : 'text-foreground'}
                            >
                                My Account
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className={isHome ? 'text-white' : 'text-foreground'}
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={register()}
                                    className={isHome ? 'text-white' : 'text-foreground'}
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
