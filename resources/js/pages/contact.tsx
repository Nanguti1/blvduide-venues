import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { toast } from 'sonner';

export default function Contact() {
    const { data, setData, post, processing, errors, reset } = useForm({
        full_name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    function submit(e: FormEvent) {
        e.preventDefault();

        post('/contact', {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: () =>
                toast.error('Please correct the highlighted contact fields.'),
        });
    }

    return (
        <>
            <Head title="Contact Us" />
            <div className="max-w-8xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
                    <div>
                        <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">
                            Contact Us
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
                            Have questions about listing your venue or finding
                            the perfect space? Reach out to our team.
                        </p>
                        <div className="mt-8 space-y-4 rounded-3xl border border-slate-200 bg-white p-8 dark:border-slate-700 dark:bg-slate-900">
                            <p>
                                <span className="font-medium">Email:</span>{' '}
                                support@blvdguide.com
                            </p>
                            <p>
                                <span className="font-medium">Phone:</span>{' '}
                                +254-707-199-880
                            </p>
                            <p>
                                <span className="font-medium">Hours:</span>{' '}
                                Mon–Fri, 9am–6pm EAT
                            </p>
                        </div>
                    </div>
                    <form
                        onSubmit={submit}
                        className="space-y-5 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900"
                    >
                        <div className="grid gap-4 md:grid-cols-2">
                            <Field label="Full Name" error={errors.full_name}>
                                <input
                                    value={data.full_name}
                                    onChange={(e) =>
                                        setData('full_name', e.target.value)
                                    }
                                    className={inputClass}
                                />
                            </Field>
                            <Field label="Email Address" error={errors.email}>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    className={inputClass}
                                />
                            </Field>
                            <Field
                                label="Phone Number (optional)"
                                error={errors.phone}
                            >
                                <input
                                    value={data.phone}
                                    onChange={(e) =>
                                        setData('phone', e.target.value)
                                    }
                                    className={inputClass}
                                />
                            </Field>
                            <Field label="Subject" error={errors.subject}>
                                <input
                                    value={data.subject}
                                    onChange={(e) =>
                                        setData('subject', e.target.value)
                                    }
                                    className={inputClass}
                                />
                            </Field>
                        </div>
                        <Field label="Message" error={errors.message}>
                            <textarea
                                value={data.message}
                                onChange={(e) =>
                                    setData('message', e.target.value)
                                }
                                rows={6}
                                className={inputClass}
                            />
                        </Field>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
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
