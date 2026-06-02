import { wayfinder } from '@/routes/helpers';

export const index = () => wayfinder('get', '/passkeys/confirm/options');
export const store = () => wayfinder('post', '/passkeys/confirm');
