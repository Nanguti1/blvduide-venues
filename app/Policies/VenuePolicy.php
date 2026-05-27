<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Venue;

class VenuePolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('venues.view-any') || $user->can('venues.view-own');
    }

    public function view(User $user, Venue $venue): bool
    {
        return $user->can('venues.view-any') || $venue->user_id === $user->id;
    }

    public function create(User $user): bool
    {
        return $user->can('venues.create');
    }

    public function update(User $user, Venue $venue): bool
    {
        return $user->can('venues.approve') || ($user->can('venues.update-own') && $venue->user_id === $user->id);
    }

    public function delete(User $user, Venue $venue): bool
    {
        return $user->can('venues.approve') || ($user->can('venues.delete-own') && $venue->user_id === $user->id);
    }
}
