import { makeRoute } from './helpers';
export const enable = makeRoute('two-factor.enable', 'post');
export const disable = makeRoute('two-factor.disable', 'delete');
export const confirm = makeRoute('two-factor.confirm', 'post');
export const qrCode = makeRoute('two-factor.qr-code');
export const secretKey = makeRoute('two-factor.secret-key');
export const recoveryCodes = makeRoute('two-factor.recovery-codes');
export const regenerateRecoveryCodes = makeRoute(
    'two-factor.recovery-codes',
    'post',
);
