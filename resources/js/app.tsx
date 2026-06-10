import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import type { ComponentType } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import PublicLayout from '@/layouts/public-layout';
import RootLayout from '@/layouts/root-layout';
import SettingsLayout from '@/layouts/settings/layout';

const appName = import.meta.env.VITE_APP_NAME || 'BLVD GUIDE';

function isPublicPage(name: string): boolean {
    return (
        name === 'home' ||
        name.startsWith('venues/') ||
        name === 'about' ||
        name === 'contact'
    );
}

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx'),
        ) as Promise<ComponentType>,
    layout: (name) => {
        switch (true) {
            case name.startsWith('auth/'):
                return [RootLayout, AuthLayout];
            case name.startsWith('settings/'):
                return [RootLayout, AppLayout, SettingsLayout];
            case isPublicPage(name):
                return [RootLayout, PublicLayout];
            default:
                return [RootLayout, AppLayout];
        }
    },
    strictMode: true,
    progress: {
        color: '#7ec0da',
    },
    setup({ el, App, props }) {
        if (!el) {
            throw new Error('Inertia root element was not found.');
        }

        createRoot(el).render(
            <TooltipProvider delayDuration={0}>
                <App {...props} />
                <Toaster />
            </TooltipProvider>,
        );
    },
});

// This will set light / dark mode on load...
initializeTheme();
