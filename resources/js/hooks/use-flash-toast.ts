import { router, usePage } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import type { FlashToast } from '@/types/ui';

export function useFlashToast(): void {
    const { flash } = usePage().props as { flash?: { toast?: FlashToast } };
    const lastToast = useRef<string | null>(null);

    function showToast(data?: FlashToast | null): void {
        const key = data ? `${data.type}:${data.message}` : null;

        if (!data || lastToast.current === key) {
            return;
        }

        lastToast.current = key;
        toast[data.type](data.message);
    }

    useEffect(() => {
        showToast(flash?.toast);
    }, [flash?.toast]);

    useEffect(() => {
        return router.on('flash', (event) => {
            const flash = (event as CustomEvent).detail?.flash;
            const data = flash?.toast as FlashToast | undefined;

            showToast(data);
        });
    }, []);
}
