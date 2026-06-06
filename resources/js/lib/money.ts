export function formatPrice(
    amount: number | string | null | undefined,
): string {
    if (amount === null || amount === undefined || amount === '') {
        return 'Contact';
    }

    const value = typeof amount === 'string' ? parseFloat(amount) : amount;

    if (Number.isNaN(value)) {
        return 'Contact';
    }

    return `Kes ${value.toLocaleString('en-KE')}`;
}
