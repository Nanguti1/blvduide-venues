import { Link } from '@inertiajs/react';

export type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

export type PaginatedResource = {
    current_page?: number;
    from?: number | null;
    last_page?: number;
    links?: PaginationLink[];
    per_page?: number;
    to?: number | null;
    total?: number;
};

function cleanLabel(label: string) {
    return label.replace('&laquo;', '‹').replace('&raquo;', '›');
}

export default function Pagination({
    resource,
}: {
    resource?: PaginatedResource;
}) {
    if (!resource?.links?.length || (resource.last_page ?? 1) <= 1) {
        return null;
    }

    return (
        <div className="mt-6 flex flex-col gap-3 rounded-3xl border border-border bg-card px-4 py-4 text-sm text-muted-foreground shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <p>
                Showing{' '}
                <span className="font-semibold text-foreground">
                    {resource.from ?? 0}
                </span>{' '}
                to{' '}
                <span className="font-semibold text-foreground">
                    {resource.to ?? 0}
                </span>{' '}
                of{' '}
                <span className="font-semibold text-foreground">
                    {resource.total ?? 0}
                </span>{' '}
                results
            </p>
            <div className="flex flex-wrap gap-2">
                {resource.links.map((link, index) =>
                    link.url ? (
                        <Link
                            key={`${link.label}-${index}`}
                            href={link.url}
                            preserveScroll
                            className={
                                link.active
                                    ? 'rounded-full bg-primary px-4 py-2 font-semibold text-primary-foreground'
                                    : 'rounded-full border border-border px-4 py-2 text-foreground transition hover:bg-muted'
                            }
                        >
                            {cleanLabel(link.label)}
                        </Link>
                    ) : (
                        <span
                            key={`${link.label}-${index}`}
                            className="cursor-not-allowed rounded-full border border-border px-4 py-2 text-muted-foreground/60"
                        >
                            {cleanLabel(link.label)}
                        </span>
                    ),
                )}
            </div>
        </div>
    );
}
