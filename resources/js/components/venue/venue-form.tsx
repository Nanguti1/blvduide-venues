import { useForm, usePage } from '@inertiajs/react';
import { FormEvent, useMemo, useState } from 'react';
import dashboardVenues from '@/routes/dashboard/venues';
import type { Auth } from '@/types/auth';

type LocationNode = {
    id: number;
    name: string;
    slug: string;
    counties?: Array<{
        id: number;
        name: string;
        slug: string;
        cities?: Array<{
            id: number;
            name: string;
            slug: string;
            locales?: Array<{ id: number; name: string; slug: string }>;
        }>;
    }>;
};

type VenueFormProps = {
    venue?: Record<string, any>;
    categories: Array<{ id: number; name: string }>;
    features: Array<{ id: number; name: string }>;
    countries: LocationNode[];
    submitLabel?: string;
};

export default function VenueForm({
    venue,
    categories,
    features,
    countries,
    submitLabel = 'Save Venue',
}: VenueFormProps) {
    const { auth } = usePage().props as { auth: Auth };
    const isSuperAdmin = auth.user?.roles?.some((r: any) => r.name === 'Super Admin');
    const isEditing = Boolean(venue?.id);
    const [coverPreview, setCoverPreview] = useState<string | null>(null);
    const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

    const { data, setData, post, put, processing, errors, transform } = useForm({
        title: venue?.title ?? '',
        slug: venue?.slug ?? '',
        description: venue?.description ?? '',
        short_description: venue?.short_description ?? '',
        venue_category_id: venue?.venue_category_id ?? categories[0]?.id ?? '',
        country_id: venue?.country_id ?? countries[0]?.id ?? '',
        county_id: venue?.county_id ?? '',
        city_id: venue?.city_id ?? '',
        locale_id: venue?.locale_id ?? '',
        operational_status: venue?.operational_status ?? 'available',
        price: venue?.price ?? '',
        address: venue?.address ?? '',
        latitude: venue?.latitude ?? '',
        longitude: venue?.longitude ?? '',
        contact_email: venue?.contact_email ?? '',
        contact_phone: venue?.contact_phone ?? '',
        website: venue?.website ?? '',
        capacity: venue?.capacity ?? '',
        meta_title: venue?.meta_title ?? '',
        meta_description: venue?.meta_description ?? '',
        features: (venue?.features ?? []).map((f: any) => f.id) as number[],
        cover: null as File | null,
        gallery: [] as File[],
        submit_for_approval: false,
    });

    const counties = useMemo(
        () =>
            countries.find((c) => c.id === Number(data.country_id))?.counties ??
            [],
        [countries, data.country_id],
    );

    const cities = useMemo(
        () =>
            counties.find((c) => c.id === Number(data.county_id))?.cities ?? [],
        [counties, data.county_id],
    );

    const locales = useMemo(
        () => cities.find((c) => c.id === Number(data.city_id))?.locales ?? [],
        [cities, data.city_id],
    );

    function toggleFeature(id: number) {
        setData(
            'features',
            data.features.includes(id)
                ? data.features.filter((f) => f !== id)
                : [...data.features, id],
        );
    }

    function submit(e: FormEvent, forApproval = false) {
        e.preventDefault();

        const options = { forceFormData: true as const };

        transform((current) => ({
            ...current,
            submit_for_approval: forApproval,
        }));

        if (isEditing) {
            put(dashboardVenues.update.url(venue!.slug), options);
            return;
        }

        post(dashboardVenues.store.url(), options);
    }

    return (
        <form onSubmit={submit} className="space-y-6">
            <div className="grid gap-4">
                <Field label="Title" error={errors.title}>
                    <input
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        className={inputClass}
                    />
                </Field>
                <Field label="Short description" error={errors.short_description}>
                    <textarea
                        value={data.short_description}
                        onChange={(e) =>
                            setData('short_description', e.target.value)
                        }
                        rows={2}
                        className={inputClass}
                    />
                </Field>
                <Field label="Description" error={errors.description}>
                    <textarea
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        rows={6}
                        className={inputClass}
                    />
                </Field>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Field label="Category" error={errors.venue_category_id}>
                    <select
                        value={data.venue_category_id}
                        onChange={(e) =>
                            setData('venue_category_id', Number(e.target.value))
                        }
                        className={inputClass}
                    >
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </Field>
                <Field label="Price" error={errors.price}>
                    <input
                        type="number"
                        value={data.price}
                        onChange={(e) => setData('price', e.target.value)}
                        className={inputClass}
                    />
                </Field>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Field label="Country" error={errors.country_id}>
                    <select
                        value={data.country_id}
                        onChange={(e) => {
                            setData((prev) => ({
                                ...prev,
                                country_id: Number(e.target.value),
                                county_id: '',
                                city_id: '',
                                locale_id: '',
                            }));
                        }}
                        className={inputClass}
                    >
                        {countries.map((country) => (
                            <option key={country.id} value={country.id}>
                                {country.name}
                            </option>
                        ))}
                    </select>
                </Field>
                <Field label="County" error={errors.county_id}>
                    <select
                        value={data.county_id}
                        onChange={(e) => {
                            setData((prev) => ({
                                ...prev,
                                county_id: Number(e.target.value),
                                city_id: '',
                                locale_id: '',
                            }));
                        }}
                        className={inputClass}
                    >
                        <option value="">Select county</option>
                        {counties.map((county) => (
                            <option key={county.id} value={county.id}>
                                {county.name}
                            </option>
                        ))}
                    </select>
                </Field>
                <Field label="City" error={errors.city_id}>
                    <select
                        value={data.city_id}
                        onChange={(e) => {
                            setData((prev) => ({
                                ...prev,
                                city_id: Number(e.target.value),
                                locale_id: '',
                            }));
                        }}
                        className={inputClass}
                    >
                        <option value="">Select city</option>
                        {cities.map((city) => (
                            <option key={city.id} value={city.id}>
                                {city.name}
                            </option>
                        ))}
                    </select>
                </Field>
                <Field label="Area / Locale" error={errors.locale_id}>
                    <select
                        value={data.locale_id}
                        onChange={(e) =>
                            setData('locale_id', Number(e.target.value) || '')
                        }
                        className={inputClass}
                    >
                        <option value="">Select area</option>
                        {locales.map((locale) => (
                            <option key={locale.id} value={locale.id}>
                                {locale.name}
                            </option>
                        ))}
                    </select>
                </Field>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Field label="Capacity" error={errors.capacity}>
                    <input
                        type="number"
                        value={data.capacity}
                        onChange={(e) => setData('capacity', e.target.value)}
                        className={inputClass}
                    />
                </Field>
                <Field label="Address" error={errors.address}>
                    <input
                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
                        className={inputClass}
                    />
                </Field>
            </div>

            <div>
                <p className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                    Amenities
                </p>
                <div className="flex flex-wrap gap-2">
                    {features.map((feature) => (
                        <button
                            key={feature.id}
                            type="button"
                            onClick={() => toggleFeature(feature.id)}
                            className={`rounded-full px-3 py-1 text-sm transition ${
                                data.features.includes(feature.id)
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                            }`}
                        >
                            {feature.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Field label="Cover image" error={errors.cover}>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            setData('cover', file ?? null);
                            if (file) {
                                const reader = new FileReader();
                                reader.onload = () => setCoverPreview(reader.result as string);
                                reader.readAsDataURL(file);
                            }
                        }}
                        className={inputClass}
                    />
                    {coverPreview && (
                        <div className="mt-3">
                            <img src={coverPreview} alt="Cover preview" className="max-h-48 w-full rounded-2xl object-cover" />
                        </div>
                    )}
                </Field>
                <Field label="Gallery images" error={errors.gallery}>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                            const files = Array.from(e.target.files ?? []);
                            setData('gallery', files);
                            const previews: string[] = [];
                            let loadedCount = 0;
                            files.forEach((file) => {
                                const reader = new FileReader();
                                reader.onload = () => {
                                    previews.push(reader.result as string);
                                    loadedCount++;
                                    if (loadedCount === files.length) {
                                        setGalleryPreviews(previews);
                                    }
                                };
                                reader.readAsDataURL(file);
                            });
                        }}
                        className={inputClass}
                    />
                    {galleryPreviews.length > 0 && (
                        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                            {galleryPreviews.map((preview, idx) => (
                                <img
                                    key={idx}
                                    src={preview}
                                    alt={`Gallery preview ${idx + 1}`}
                                    className="aspect-square rounded-2xl object-cover"
                                />
                            ))}
                        </div>
                    )}
                </Field>
            </div>

            <div className="flex flex-wrap items-center gap-3">
                <button
                    type="submit"
                    disabled={processing}
                    className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
                >
                    {submitLabel}
                </button>
                <button
                    type="button"
                    disabled={processing}
                    onClick={(e) => submit(e, true)}
                    className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200"
                >
                    Save &amp; submit for approval
                </button>
                {isSuperAdmin && (
                    <button
                        type="button"
                        disabled={processing}
                        onClick={(e) => {
                            e.preventDefault();
                            const options = { forceFormData: true as const };
                            transform((current) => ({
                                ...current,
                                publish_directly: true,
                            }));
                            if (isEditing) {
                                put(dashboardVenues.update.url(venue!.slug), options);
                            } else {
                                post(dashboardVenues.store.url(), options);
                            }
                        }}
                        className="rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:opacity-50"
                    >
                        Publish Now
                    </button>
                )}
            </div>
        </form>
    );
}

const inputClass =
    'w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100';

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
        <label className="block">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                {label}
            </span>
            <div className="mt-2">{children}</div>
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </label>
    );
}
