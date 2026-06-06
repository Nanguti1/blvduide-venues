<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Login;
use Spatie\Activitylog\Facades\CauserResolver;

class LogSuccessfulLogin
{
    public function handle(Login $event): void
    {
        CauserResolver::setCauser($event->user);

        activity('auth')
            ->causedBy($event->user)
            ->withProperties(['ip' => request()->ip()])
            ->log('User logged in');
    }
}
