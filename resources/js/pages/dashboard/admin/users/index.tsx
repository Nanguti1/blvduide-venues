import { Head, Link, router } from '@inertiajs/react';
import { toast } from 'sonner';
import FilterBar from '@/components/dashboard/filter-bar';
import DashboardPageShell from '@/components/dashboard-page-shell';
import Pagination from '@/components/pagination';

export default function DashboardUsersIndex({
    users,
    filters = {},
    roles = [],
}: any) {
    function deleteUser(user: any) {
        if (!window.confirm(`Delete ${user.name}? This cannot be undone.`)) {
            return;
        }

        router.delete(`/dashboard/admin/users/${user.id}`, {
            preserveScroll: true,
            onError: () => toast.error('Unable to delete this user.'),
        });
    }

    return (
        <>
            <Head title="Users" />
            <DashboardPageShell
                title="Users"
                description="Manage user accounts, roles, and account status."
                action={
                    <Link
                        href="/dashboard/admin/users/create"
                        className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                    >
                        Add User
                    </Link>
                }
            >
                <FilterBar
                    filters={filters}
                    fields={[
                        {
                            label: 'Search',
                            name: 'q',
                            placeholder: 'Name, email, or phone',
                        },
                        {
                            label: 'Status',
                            name: 'status',
                            type: 'select',
                            options: [
                                { label: 'Active', value: 'active' },
                                { label: 'Inactive', value: 'inactive' },
                            ],
                        },
                        {
                            label: 'Role',
                            name: 'role',
                            type: 'select',
                            options: roles.map((role: any) => ({
                                label: role.name,
                                value: role.name,
                            })),
                        },
                    ]}
                />
                <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
                    <table className="min-w-full divide-y divide-border text-left text-sm">
                        <thead className="bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold">
                                    User
                                </th>
                                <th className="px-6 py-4 font-semibold">
                                    Phone
                                </th>
                                <th className="px-6 py-4 font-semibold">
                                    Role
                                </th>
                                <th className="px-6 py-4 font-semibold">
                                    Status
                                </th>
                                <th className="px-6 py-4 font-semibold">
                                    Created
                                </th>
                                <th className="px-6 py-4 font-semibold">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border bg-white dark:bg-slate-950">
                            {users.data?.map((user: any) => (
                                <tr
                                    key={user.id}
                                    className="hover:bg-slate-50 dark:hover:bg-slate-900"
                                >
                                    <td className="px-6 py-4 align-top">
                                        <p className="font-semibold text-slate-900 dark:text-slate-100">
                                            {user.name}
                                        </p>
                                        <p className="text-sm text-slate-500">
                                            {user.email}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4 align-top text-slate-600 dark:text-slate-300">
                                        {user.phone || '–'}
                                    </td>
                                    <td className="px-6 py-4 align-top text-slate-600 dark:text-slate-300">
                                        {user.roles
                                            ?.map((role: any) => role.name)
                                            .join(', ') || '–'}
                                    </td>
                                    <td className="px-6 py-4 align-top">
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}
                                        >
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 align-top text-slate-600 dark:text-slate-300">
                                        {new Date(
                                            user.created_at,
                                        ).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right align-top">
                                        <div className="flex flex-wrap justify-end gap-2">
                                            <Link
                                                href={`/dashboard/admin/users/${user.id}`}
                                                className="rounded-full border border-border px-4 py-2 text-sm transition hover:bg-muted"
                                            >
                                                View
                                            </Link>
                                            <Link
                                                href={`/dashboard/admin/users/${user.id}/edit`}
                                                className="rounded-full border border-border px-4 py-2 text-sm transition hover:bg-muted"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() => deleteUser(user)}
                                                className="rounded-full bg-destructive px-4 py-2 text-sm font-semibold text-white transition hover:bg-destructive/90"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination resource={users} />
            </DashboardPageShell>
        </>
    );
}
