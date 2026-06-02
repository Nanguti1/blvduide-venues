import { makeRoute } from './helpers';
export const request = makeRoute('password.request');
export const email = makeRoute('password.email', 'post');
export const update = makeRoute('password.update', 'post');
