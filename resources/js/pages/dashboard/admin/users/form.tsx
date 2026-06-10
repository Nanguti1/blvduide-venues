import { Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { toast } from 'sonner';

type Role = { id: number; name: string };
type Status = { label: string; value: string };

type Props = {
    user?: any;
    roles: Role[];
    statuses: Status[];
    submitLabel: string;
};

export default function UserForm({
    user,
    roles,
    statuses,
    submitLabel,
}: Props) {
    const isEditing = Boolean(user?.id);
    const { data, setData, post, put, processing, errors } = useForm({
        name: user?.name ?? '',
        email: user?.email ?? '',
        phone: user?.phone ?? '',
        role: user?.roles?.[0]?.name ?? roles[0]?.name ?? '',
        status: user?.status ?? 'active',
        password: '',
        password_confirmation: '',
    });

    function submit(e: FormEvent) {
        e.preventDefault();
        const options = {
            preserveScroll: true,
            onError: () =>
                toast.error('Please correct the highlighted user fields.'),
        };

        if (isEditing) {
            put(`/dashboard/admin/users/${user.id}`, options);

            return;
        }

        post('/dashboard/admin/users', options);
    }

    return (
        <form
            onSubmit={submit}
            className="max-w-3xl space-y-6 rounded-3xl border border-border bg-card p-6 shadow-sm"
        >
            <div className="grid gap-4 md:grid-cols-2">
                <Field label="Name" error={errors.name}>
                    <input
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className={inputClass}
                    />
                </Field>
                <Field label="Email" error={errors.email}>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className={inputClass}
                    />
                </Field>
                <Field label="Phone" error={errors.phone}>
                    <input
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        className={inputClass}
                    />
                </Field>
                <Field label="Role" error={errors.role}>
                    <select
                        value={data.role}
                        onChange={(e) => setData('role', e.target.value)}
                        className={inputClass}
                    >
                        {roles.map((role) => (
                            <option key={role.id} value={role.name}>
                                {role.name}
                            </option>
                        ))}
                    </select>
                </Field>
                <Field label="Status" error={errors.status}>
                    <select
                        value={data.status}
                        onChange={(e) => setData('status', e.target.value)}
                        className={inputClass}
                    >
                        {statuses.map((status) => (
                            <option key={status.value} value={status.value}>
                                {status.label}
                            </option>
                        ))}
                    </select>
                </Field>
                <div />
                <Field
                    label={isEditing ? 'New password' : 'Password'}
                    error={errors.password}
                >
                    <input
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        className={inputClass}
                    />
                </Field>
                <Field
                    label="Confirm password"
                    error={errors.password_confirmation}
                >
                    <input
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        className={inputClass}
                    />
                </Field>
            </div>
            {isEditing && (
                <p className="text-sm text-muted-foreground">
                    Leave password fields blank to keep the current password.
                </p>
            )}
            <div className="flex flex-wrap justify-end gap-3">
                <Link
                    href="/dashboard/admin/users"
                    className="rounded-full border border-border px-5 py-3 text-sm font-semibold transition hover:bg-muted"
                >
                    Cancel
                </Link>
                <button
                    type="submit"
                    disabled={processing}
                    className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
                >
                    {submitLabel}
                </button>
            </div>
        </form>
    );
}

const inputClass =
    'mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100';

function Field({
    label,
    error,
    children,
}: {
    label: string;
    error?: string;
    children: React.ReactNode;
}) {
    return (
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            {label}
            {children}
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </label>
    );
}
