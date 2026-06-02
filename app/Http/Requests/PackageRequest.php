<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PackageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('packages.manage') ?? false;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'min:0'],
            'duration_days' => ['required', 'integer', 'min:1'],
            'max_listings' => ['required', 'integer', 'min:0'],
            'max_images_per_listing' => ['required', 'integer', 'min:0'],
            'featured_listing_allowance' => ['required', 'integer', 'min:0'],
            'badge_color' => ['nullable', 'string', 'max:20'],
            'support_features' => ['nullable', 'array'],
            'support_features.*' => ['string'],
            'is_active' => ['sometimes', 'boolean'],
        ];
    }
}
