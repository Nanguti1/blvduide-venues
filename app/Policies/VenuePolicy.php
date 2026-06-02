<?php

namespace App\Policies;

use App\Enums\SubscriptionStatus;
use App\Models\User;
use App\Models\Venue;
use Illuminate\Auth\Access\Response;

class VenuePolicy
{
    public function before(User $user, string $ability): ?bool
    {
        return $user->hasRole('Super Admin') ? true : null;
    }

    public function viewAny(User $user): bool
    {
        return $user->can('venues.view-any') || $user->can('venues.view-own');
    }

    public function view(User $user, Venue $venue): bool
    {
        return $user->can('venues.view-any') || ($user->can('venues.view-own') && $venue->user_id === $user->id);
    }

    public function create(User $user): bool
    {
        return $user->can('venues.create') && $user->hasActiveSubscription();
    }

    public function update(User $user, Venue $venue): bool
    {
        return $user->can('venues.update-own') && $venue->user_id === $user->id;
    }

    public function delete(User $user, Venue $venue): bool
    {
        return $user->can('venues.delete-own') && $venue->user_id === $user->id;
    }

    public function approve(User $user): bool
    {
        return $user->can('venues.approve');
    }

    public function createWithoutSubscription(User $user): bool
    {
        return $user->can('venues.create');
    }
}
