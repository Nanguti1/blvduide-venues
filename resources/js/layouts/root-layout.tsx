import FlashToastListener from '@/components/flash-toast-listener';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <FlashToastListener />
            {children}
        </>
    );
}
