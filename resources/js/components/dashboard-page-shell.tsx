import type { ReactNode } from 'react';

type Props = {
    title: string;
    description?: string;
    action?: ReactNode;
    children: ReactNode;
};

export default function DashboardPageShell({
    title,
    description,
    action,
    children,
}: Props) {
    return (
        <div className="w-full px-4 py-10 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-semibold text-foreground">
                        {title}
                    </h1>
                    {description ? (
                        <p className="mt-2 text-sm text-muted-foreground">
                            {description}
                        </p>
                    ) : null}
                </div>
                {action ? (
                    <div className="flex flex-wrap gap-2">{action}</div>
                ) : null}
            </div>
            {children}
        </div>
    );
}
