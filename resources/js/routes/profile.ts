import { makeRoute } from './helpers';
export const edit = makeRoute('profile.edit');
export const update = makeRoute('profile.update', 'patch');
export const destroy = makeRoute('profile.destroy', 'delete');
