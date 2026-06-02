<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;
use App\Enums\VenueApprovalStatus;
use App\Enums\VenueOperationalStatus;

class StoreVenueRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('venues.create') ?? false;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:venues,slug'],
            'description' => ['required', 'string'],
            'short_description' => ['nullable', 'string', 'max:500'],
            'venue_category_id' => ['required', 'exists:venue_categories,id'],
            'country_id' => ['required', 'exists:countries,id'],
            'county_id' => ['required', 'exists:counties,id'],
            'city_id' => ['required', 'exists:cities,id'],
            'locale_id' => ['nullable', 'exists:locales,id'],
            'operational_status' => ['nullable', new Enum(VenueOperationalStatus::class)],
            'featured' => ['sometimes', 'boolean'],
            'price' => ['nullable', 'numeric', 'min:0'],
            'address' => ['nullable', 'string', 'max:255'],
            'latitude' => ['nullable', 'numeric'],
            'longitude' => ['nullable', 'numeric'],
            'contact_email' => ['nullable', 'email', 'max:255'],
            'contact_phone' => ['nullable', 'string', 'max:50'],
            'website' => ['nullable', 'url', 'max:255'],
            'capacity' => ['nullable', 'integer', 'min:1'],
            'published_at' => ['nullable', 'date'],
            'expires_at' => ['nullable', 'date', 'after:published_at'],
            'meta_title' => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string', 'max:500'],
            'features' => ['nullable', 'array'],
            'features.*' => ['integer', 'exists:venue_features,id'],
            'gallery' => ['nullable', 'array'],
            'gallery.*' => ['image', 'max:5120'],
            'cover' => ['nullable', 'image', 'max:5120'],
            'submit_for_approval' => ['sometimes', 'boolean'],
        ];
    }

}
