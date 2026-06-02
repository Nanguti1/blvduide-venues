<?php

namespace App\Services;

use App\Enums\PaymentStatus;
use App\Enums\SubscriptionStatus;
use App\Models\Package;
use App\Models\Subscription;
use App\Models\User;
use Carbon\CarbonImmutable;

class SubscriptionService
{
    public function assignPackage(User $user, Package $package, ?string $transactionReference = null, PaymentStatus $paymentStatus = PaymentStatus::Completed): Subscription
    {
        $startsAt = CarbonImmutable::now();
        $expiresAt = $startsAt->addDays($package->duration_days);

        return $user->subscriptions()->create([
            'package_id' => $package->id,
            'starts_at' => $startsAt,
            'expires_at' => $expiresAt,
            'payment_status' => $paymentStatus,
            'transaction_reference' => $transactionReference,
            'status' => SubscriptionStatus::Active,
        ]);
    }

    public function refresh(User $user): void
    {
        $active = $user->subscriptions()
            ->where('status', SubscriptionStatus::Active)
            ->where('expires_at', '>=', now())
            ->latest('expires_at')
            ->first();

        if (! $active) {
            $user->subscriptions()
                ->where('status', SubscriptionStatus::Active)
                ->where('expires_at', '<', now())
                ->update(['status' => SubscriptionStatus::Expired]);
        }
    }
}
