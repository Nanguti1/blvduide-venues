<?php
namespace App\Models;

use App\Enums\PaymentStatus;
use App\Enums\SubscriptionStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Subscription extends Model
{
    use HasFactory;

    protected $fillable = ['user_id','package_id','starts_at','expires_at','payment_status','transaction_reference','status'];

    protected function casts(): array
    {
        return [
            'starts_at' => 'datetime',
            'expires_at' => 'datetime',
            'payment_status' => PaymentStatus::class,
            'status' => SubscriptionStatus::class,
        ];
    }

    public function user(): BelongsTo { return $this->belongsTo(User::class); }
    public function package(): BelongsTo { return $this->belongsTo(Package::class); }
}
