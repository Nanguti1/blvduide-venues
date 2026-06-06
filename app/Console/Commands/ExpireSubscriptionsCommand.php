<?php

namespace App\Console\Commands;

use App\Enums\SubscriptionStatus;
use App\Models\Subscription;
use Illuminate\Console\Command;

class ExpireSubscriptionsCommand extends Command
{
    protected $signature = 'subscriptions:expire';

    protected $description = 'Mark expired subscriptions and update their status';

    public function handle(): int
    {
        $count = Subscription::query()
            ->where('status', SubscriptionStatus::Active)
            ->where('expires_at', '<', now())
            ->update(['status' => SubscriptionStatus::Expired]);

        $this->info("Expired {$count} subscription(s).");

        return self::SUCCESS;
    }
}
