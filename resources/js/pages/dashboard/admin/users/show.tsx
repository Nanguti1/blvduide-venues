import { Head, Link } from '@inertiajs/react';
import DashboardPageShell from '@/components/dashboard-page-shell';

export default function DashboardUsersShow({ managedUser }: any) {
    return (
        <>
            <Head title={managedUser.name} />
            <DashboardPageShell
                title={managedUser.name}
                description="User account details."
                action={
                    <Link
                        href={`/dashboard/admin/users/${managedUser.id}/edit`}
                        className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                    >
                        Edit User
                    </Link>
                }
            >
                <div className="max-w-3xl rounded-3xl border border-border bg-card p-6 shadow-sm">
                    <dl className="grid gap-4 sm:grid-cols-2">
                        <Info label="Name" value={managedUser.name} />
                        <Info label="Email" value={managedUser.email} />
                        <Info label="Phone" value={managedUser.phone || '–'} />
                        <Info
                            label="Role"
                            value={
                                managedUser.roles
                                    ?.map((role: any) => role.name)
                                    .join(', ') || '–'
                            }
                        />
                        <Info label="Status" value={managedUser.status} />
                        <Info
                            label="Created"
                            value={new Date(
                                managedUser.created_at,
                            ).toLocaleString()}
                        />
                    </dl>
                </div>
            </DashboardPageShell>
        </>
    );
}

function Info({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <dt className="text-sm font-medium text-muted-foreground">
                {label}
            </dt>
            <dd className="mt-1 font-semibold text-foreground">{value}</dd>
        </div>
    );
}
