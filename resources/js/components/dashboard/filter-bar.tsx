import { router } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { useState } from 'react';

type Option = { label: string; value: string | number | boolean };
type Field = {
    label: string;
    name: string;
    type?: 'text' | 'select' | 'date' | 'number';
    placeholder?: string;
    options?: Option[];
};

type Props = {
    filters?: Record<string, string | number | null | undefined>;
    fields: Field[];
};

export default function FilterBar({ filters = {}, fields }: Props) {
    const [values, setValues] = useState<Record<string, string>>(() =>
        fields.reduce(
            (carry, field) => ({
                ...carry,
                [field.name]: String(filters[field.name] ?? ''),
            }),
            {},
        ),
    );

    function submit(e: FormEvent) {
        e.preventDefault();

        const query = Object.fromEntries(
            Object.entries(values).filter(([, value]) => value !== ''),
        );

        router.get(window.location.pathname, query, {
            preserveScroll: true,
            preserveState: true,
            replace: true,
        });
    }

    function reset() {
        setValues(
            fields.reduce(
                (carry, field) => ({
                    ...carry,
                    [field.name]: '',
                }),
                {},
            ),
        );

        router.get(
            window.location.pathname,
            {},
            {
                preserveScroll: true,
                preserveState: true,
                replace: true,
            },
        );
    }

    return (
        <form
            onSubmit={submit}
            className="mb-6 grid gap-3 rounded-3xl border border-border bg-card p-4 shadow-sm md:grid-cols-4"
        >
            {fields.map((field) =>
                field.type === 'select' ? (
                    <label key={field.name} className="space-y-1 text-sm">
                        <span className="font-medium text-foreground">
                            {field.label}
                        </span>
                        <select
                            value={values[field.name] ?? ''}
                            onChange={(e) =>
                                setValues({
                                    ...values,
                                    [field.name]: e.target.value,
                                })
                            }
                            className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm"
                        >
                            <option value="">All</option>
                            {field.options?.map((option) => (
                                <option
                                    key={String(option.value)}
                                    value={String(option.value)}
                                >
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </label>
                ) : (
                    <label key={field.name} className="space-y-1 text-sm">
                        <span className="font-medium text-foreground">
                            {field.label}
                        </span>
                        <input
                            type={field.type ?? 'text'}
                            placeholder={field.placeholder}
                            value={values[field.name] ?? ''}
                            onChange={(e) =>
                                setValues({
                                    ...values,
                                    [field.name]: e.target.value,
                                })
                            }
                            className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm"
                        />
                    </label>
                ),
            )}
            <div className="flex items-end gap-2 md:col-span-4">
                <button
                    type="submit"
                    className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                >
                    Apply filters
                </button>
                <button
                    type="button"
                    onClick={reset}
                    className="rounded-full border border-border px-5 py-3 text-sm font-semibold transition hover:bg-muted"
                >
                    Reset
                </button>
            </div>
        </form>
    );
}
