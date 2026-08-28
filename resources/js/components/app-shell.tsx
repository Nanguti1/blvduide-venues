import { usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import type { AppVariant } from '@/types';

type Props = {
    children: ReactNode;
    variant?: AppVariant;
};

export function AppShell({ children, variant = 'sidebar' }: Props) {
    const isOpen = usePage().props.sidebarOpen;

    if (variant === 'header') {
        return (
            <div className="flex min-h-screen w-full flex-col">
                {children}
                {/* WhatsApp Floating Button */}
                <a
                    href="https://wa.me/254707199880"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
                    aria-label="Contact us on WhatsApp"
                >
                    <img src="/WhatsApp.svg.webp" alt="WhatsApp" className="h-8 w-8" />
                </a>
            </div>
        );
    }

    return (
        <SidebarProvider defaultOpen={isOpen}>
            {children}
            {/* WhatsApp Floating Button */}
            <a
                href="https://wa.me/254707199880"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
                aria-label="Contact us on WhatsApp"
            >
                <img src="/WhatsApp.svg.webp" alt="WhatsApp" className="h-8 w-8" />
            </a>
        </SidebarProvider>
    );
}
