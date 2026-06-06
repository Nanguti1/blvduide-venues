import { Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    ClipboardList,
    CreditCard,
    FolderGit2,
    Heart,
    LayoutGrid,
    ShieldCheck,
    Star,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import dashboardFavorites from '@/routes/dashboard/favorites';
import dashboardPackages from '@/routes/dashboard/packages';
import dashboardReviews from '@/routes/dashboard/reviews';
import dashboardSubscriptions from '@/routes/dashboard/subscriptions';
import dashboardVenues from '@/routes/dashboard/venues';
import type { NavItem } from '@/types';

export function AppSidebar() {
    const { auth } = usePage().props as {
        auth: { user?: { permissions?: string[] } };
    };
    const permissions = auth.user?.permissions ?? [];

    const adminNavItems: NavItem[] = [];

    if (permissions.includes('venues.approve')) {
        adminNavItems.push({
            title: 'Approvals',
            href: '/dashboard/approvals',
            icon: ShieldCheck,
        });
    }

    if (permissions.includes('packages.manage')) {
        adminNavItems.push({
            title: 'Packages',
            href: dashboardPackages.index.url(),
            icon: CreditCard,
        });
    }

    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: dashboard(),
            icon: LayoutGrid,
        },
        {
            title: 'Venues',
            href: dashboardVenues.index.url(),
            icon: ClipboardList,
        },
        ...adminNavItems,
        {
            title: 'Subscriptions',
            href: dashboardSubscriptions.index.url(),
            icon: Star,
        },
        {
            title: 'Favorites',
            href: dashboardFavorites.index.url(),
            icon: Heart,
        },
        {
            title: 'Reviews',
            href: dashboardReviews.index.url(),
            icon: FolderGit2,
        },
    ];

    const footerNavItems: NavItem[] = [
        {
            title: 'Repository',
            href: 'https://github.com/laravel/react-starter-kit',
            icon: FolderGit2,
        },
        {
            title: 'Documentation',
            href: 'https://laravel.com/docs/starter-kits#react',
            icon: BookOpen,
        },
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
