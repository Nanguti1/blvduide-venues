<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Package extends Model
{
    use HasFactory;

    protected $fillable = ['name','price','duration_days','max_listings','max_images_per_listing','featured_listing_allowance','badge_color','support_features','is_active'];

    protected function casts(): array
    {
        return ['support_features' => 'array', 'is_active' => 'boolean', 'price' => 'decimal:2'];
    }

    public function subscriptions(): HasMany { return $this->hasMany(Subscription::class); }
}
