<?php

namespace App\Services\Subscriptions;

use App\Models\User;
use Carbon\CarbonImmutable;

class SubscriptionGateService
{
    public function canCreateVenue(User $user): bool
    {
        $subscription = $user->subscriptions()
            ->with('package')
            ->where('status', 'active')
            ->where('expires_at', '>', CarbonImmutable::now())
            ->latest('expires_at')
            ->first();

        if (! $subscription) {
            return false;
        }

        $activeListings = $user->venues()->whereNull('deleted_at')->count();

        return $activeListings < $subscription->package->max_listings;
    }
}
