import PublicHeader from '@/components/public-header';

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
            <PublicHeader />
            <main>{children}</main>
            <footer className="border-t border-slate-200 bg-white py-10 dark:border-slate-800 dark:bg-slate-900">
                <div className="mx-auto max-w-7xl px-4 text-center text-sm text-slate-500 sm:px-6 lg:px-8">
                    &copy; {new Date().getFullYear()} BlvdGuide. Discover
                    exceptional venues.
                </div>
            </footer>
        </div>
    );
}
