import { useAppearance } from '@/hooks/use-appearance';
import { Toaster as Sonner, type ToasterProps, toast } from 'sonner';

function Toaster({ ...props }: ToasterProps) {
    const { appearance } = useAppearance();

    return (
        <Sonner
            theme={appearance}
            className="toaster group"
            position="bottom-right"
            duration={3000}
            style={
                {
                    '--normal-bg': 'var(--popover)',
                    '--normal-text': 'var(--popover-foreground)',
                    '--normal-border': 'var(--border)',
                    '--success-bg': 'rgb(34 197 94)',
                    '--success-text': 'white',
                    '--success-border': 'rgb(34 197 94)',
                    '--error-bg': 'rgb(239 68 68)',
                    '--error-text': 'white',
                    '--error-border': 'rgb(239 68 68)',
                } as React.CSSProperties
            }
            {...props}
        />
    );
}

export { Toaster, toast };
