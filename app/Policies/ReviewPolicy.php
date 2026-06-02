<?php

namespace App\Policies;

use App\Models\Review;
use App\Models\User;

class ReviewPolicy
{
    public function before(User $user, string $ability): ?bool
    {
        return $user->hasRole('Super Admin') ? true : null;
    }

    public function viewAny(User $user): bool
    {
        return $user->can('reviews.moderate');
    }

    public function moderate(User $user): bool
    {
        return $user->can('reviews.moderate');
    }

    public function create(User $user): bool
    {
        return $user->exists;
    }
}
