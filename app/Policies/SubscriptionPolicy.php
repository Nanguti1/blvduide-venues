<?php

namespace App\Policies;

use App\Models\Subscription;
use App\Models\User;

class SubscriptionPolicy
{
    public function before(User $user, string $ability): ?bool
    {
        return $user->hasRole('Super Admin') ? true : null;
    }

    public function view(User $user, Subscription $subscription): bool
    {
        return $subscription->user_id === $user->id;
    }

    public function manage(User $user, ?Subscription $subscription = null): bool
    {
        return $user->can('subscriptions.manage');
    }
}
