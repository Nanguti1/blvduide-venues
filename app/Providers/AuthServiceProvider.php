<?php

namespace App\Providers;

use App\Models\Review;
use App\Models\Venue;
use App\Policies\ReviewPolicy;
use App\Policies\VenuePolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        Venue::class => VenuePolicy::class,
        Review::class => ReviewPolicy::class,
    ];

    public function boot(): void
    {
        $this->registerPolicies();
    }
}
