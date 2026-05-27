<?php

namespace App\Actions\Venues;

use App\Enums\VenueApprovalStatus;
use App\Models\Venue;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

class UpsertVenueAction
{
    public function execute(array $data, ?Venue $venue = null): Venue
    {
        $payload = Arr::except($data, ['features']);
        $payload['slug'] = $venue?->slug ?? Str::slug($data['title']).'-'.Str::lower(Str::random(6));
        $payload['approval_status'] = VenueApprovalStatus::Pending->value;

        $venue ??= new Venue();
        $venue->fill($payload);
        $venue->save();

        if (isset($data['features'])) {
            $venue->features()->sync($data['features']);
        }

        return $venue->refresh();
    }
}
