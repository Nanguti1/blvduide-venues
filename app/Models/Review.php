<?php

namespace App\Models;

use App\Enums\ReviewStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Review extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'venue_id', 'rating', 'comment', 'status'];

    protected function casts(): array
    {
        return [
            'rating' => 'integer',
            'status' => ReviewStatus::class,
        ];
    }

    public function scopeApproved($query)
    {
        return $query->where('status', ReviewStatus::Approved->value);
    }

    public function scopePending($query)
    {
        return $query->where('status', ReviewStatus::Pending->value);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function venue(): BelongsTo
    {
        return $this->belongsTo(Venue::class);
    }
}
