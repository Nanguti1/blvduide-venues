<?php

namespace App\Http\Requests\Venue;

use Illuminate\Foundation\Http\FormRequest;

class StoreVenueRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', \App\Models\Venue::class);
    }

    public function rules(): array
    {
        return [
            'venue_category_id' => ['required', 'exists:venue_categories,id'],
            'country_id' => ['required', 'exists:countries,id'],
            'county_id' => ['required', 'exists:counties,id'],
            'city_id' => ['required', 'exists:cities,id'],
            'locale_id' => ['nullable', 'exists:locales,id'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'short_description' => ['nullable', 'string'],
            'price' => ['nullable', 'numeric', 'min:0'],
            'capacity' => ['nullable', 'integer', 'min:1'],
            'contact_email' => ['nullable', 'email'],
            'website' => ['nullable', 'url'],
            'features' => ['nullable', 'array'],
            'features.*' => ['integer', 'exists:venue_features,id'],
        ];
    }
}
