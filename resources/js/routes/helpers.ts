import type { Method, UrlMethodPair } from '@inertiajs/core';

export type RouteParams =
    | string
    | number
    | boolean
    | null
    | undefined
    | Record<string, string | number | boolean | null | undefined>
    | Array<string | number | boolean | null | undefined>;

const definitions: Record<string, string> = {
    home: '/',
    dashboard: '/dashboard',
    login: '/login',
    'login.store': '/login',
    register: '/register',
    'register.store': '/register',
    logout: '/logout',
    'password.request': '/forgot-password',
    'password.email': '/forgot-password',
    'password.update': '/reset-password',
    'password.confirm': '/confirm-password',
    'password.confirm.store': '/confirm-password',
    'verification.send': '/email/verification-notification',
    'profile.edit': '/settings/profile',
    'profile.update': '/settings/profile',
    'profile.destroy': '/settings/profile',
    'security.edit': '/settings/security',
    'security.update': '/settings/security',
    'appearance.edit': '/settings/appearance',
    'two-factor.enable': '/user/two-factor-authentication',
    'two-factor.disable': '/user/two-factor-authentication',
    'two-factor.confirm': '/user/confirmed-two-factor-authentication',
    'two-factor.qr-code': '/user/two-factor-qr-code',
    'two-factor.secret-key': '/user/two-factor-secret-key',
    'two-factor.recovery-codes': '/user/two-factor-recovery-codes',
    'two-factor.login.store': '/two-factor-challenge',
    'dashboard.venues.index': '/dashboard/venues',
    'dashboard.venues.create': '/dashboard/venues/create',
    'dashboard.venues.store': '/dashboard/venues',
    'dashboard.venues.edit': '/dashboard/venues/{venue}/edit',
    'dashboard.venues.update': '/dashboard/venues/{venue}',
    'dashboard.venues.destroy': '/dashboard/venues/{venue}',
    'dashboard.venues.submit': '/dashboard/venues/{venue}/submit',
    'dashboard.packages.index': '/dashboard/packages',
    'dashboard.packages.create': '/dashboard/packages/create',
    'dashboard.packages.store': '/dashboard/packages',
    'dashboard.packages.edit': '/dashboard/packages/{package}/edit',
    'dashboard.packages.update': '/dashboard/packages/{package}',
    'dashboard.packages.destroy': '/dashboard/packages/{package}',
    'dashboard.subscriptions.index': '/dashboard/subscriptions',
    'dashboard.favorites.index': '/dashboard/favorites',
    'dashboard.reviews.index': '/dashboard/reviews',
    'venues.index': '/venues',
    'venues.show': '/venues/{venue}',
    'venues.categories.show': '/venues/categories/{category}',
    'venues.locales.show': '/venues/locations/{locale}',
};

const encode = (value: string | number | boolean): string =>
    encodeURIComponent(String(value));

export function route(name: string, params?: RouteParams): string {
    let path = definitions[name] ?? '/';
    const values = Array.isArray(params)
        ? [...params]
        : params && typeof params === 'object'
          ? { ...params }
          : params === undefined
            ? []
            : [params];

    path = path.replace(/\{([^}]+)\}/g, (_match, key: string) => {
        const normalizedKey = key.replace(/\?$/, '');
        let value: string | number | boolean | null | undefined;

        if (Array.isArray(values)) {
            value = values.shift();
        } else {
            value = values[normalizedKey];
        }

        return value === null || value === undefined ? '' : encode(value);
    });

    return path.replace(/\/+/g, '/');
}

if (typeof window !== 'undefined') {
    window.route = route;
}

export function wayfinder(
    method: Method,
    url: string,
): UrlMethodPair & { form: () => { method: Method; action: string } } {
    const pair = { method, url } as UrlMethodPair & {
        form: () => { method: Method; action: string };
    };
    pair.form = () => ({ method, action: url });
    return pair;
}

export function makeRoute(name: string, method: Method = 'get') {
    const fn = (params?: RouteParams) => wayfinder(method, route(name, params));
    fn.form = (params?: RouteParams) => ({
        method,
        action: route(name, params),
    });
    return fn;
}
