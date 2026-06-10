<?php

namespace App\Http\Requests;

use App\Enums\VenueOperationalStatus;
use App\Models\Venue;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class StoreVenueRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('create', Venue::class) ?? false;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:venues,slug'],
            'description' => ['required', 'string'],
            'short_description' => ['nullable', 'string', 'max:500'],
            'venue_category_id' => ['required', 'exists:venue_categories,id'],
            'country_id' => ['required_without:country_name', 'nullable', 'exists:countries,id'],
            'country_name' => ['required_without:country_id', 'nullable', 'string', 'max:255'],
            'county_id' => ['required_without:county_name', 'nullable', 'exists:counties,id'],
            'county_name' => ['required_without:county_id', 'nullable', 'string', 'max:255'],
            'city_id' => ['required_without:city_name', 'nullable', 'exists:cities,id'],
            'city_name' => ['required_without:city_id', 'nullable', 'string', 'max:255'],
            'locale_id' => ['nullable', 'exists:locales,id'],
            'locale_name' => ['nullable', 'string', 'max:255'],
            'operational_status' => ['nullable', new Enum(VenueOperationalStatus::class)],
            'featured' => $this->user()?->hasRole('Super Admin') ? ['sometimes', 'boolean'] : ['prohibited'],
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
            'publish_directly' => ['sometimes', 'boolean'],
        ];
    }

}
