<?php

namespace App\Models;

use App\Enums\VenueApprovalStatus;
use App\Enums\VenueOperationalStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Venue extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'user_id','venue_category_id','country_id','county_id','city_id','locale_id','title','slug','description','short_description',
        'operational_status','approval_status','featured','price','address','latitude','longitude','contact_email','contact_phone',
        'website','capacity','published_at','expires_at','meta_title','meta_description',
    ];

    protected function casts(): array
    {
        return [
            'featured' => 'boolean',
            'price' => 'decimal:2',
            'published_at' => 'datetime',
            'expires_at' => 'datetime',
            'approval_status' => VenueApprovalStatus::class,
            'operational_status' => VenueOperationalStatus::class,
        ];
    }

    public function user(): BelongsTo { return $this->belongsTo(User::class); }
    public function category(): BelongsTo { return $this->belongsTo(VenueCategory::class, 'venue_category_id'); }
    public function features(): BelongsToMany { return $this->belongsToMany(VenueFeature::class); }
    public function reviews(): HasMany { return $this->hasMany(Review::class); }
}
