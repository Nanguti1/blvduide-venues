import { makeRoute } from './routes/helpers';

export const home = makeRoute('home');
export const dashboard = makeRoute('dashboard');
export const login = makeRoute('login');
export const register = makeRoute('register');
export const logout = makeRoute('logout', 'post');
