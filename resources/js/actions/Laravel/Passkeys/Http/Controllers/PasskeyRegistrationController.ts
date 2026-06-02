import { wayfinder } from '@/routes/helpers';

const destroyRoute = (id?: string | number) =>
    wayfinder('delete', destroyRoute.url(id));
destroyRoute.url = (id?: string | number) =>
    `/passkeys/${id ?? ''}`.replace(/\/$/, '');

export const destroy = destroyRoute;
