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
use Illuminate\Database\Eloquent\Builder;
use Spatie\Activitylog\Models\Concerns\LogsActivity;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Venue extends Model implements HasMedia
{
    use HasFactory;
    use SoftDeletes;
    use InteractsWithMedia;
    use LogsActivity;

    protected $fillable = [
        'user_id', 'venue_category_id', 'country_id', 'county_id', 'city_id', 'locale_id', 'title', 'slug', 'description', 'short_description',
        'operational_status', 'approval_status', 'featured', 'price', 'address', 'latitude', 'longitude', 'contact_email', 'contact_phone',
        'website', 'capacity', 'published_at', 'expires_at', 'meta_title', 'meta_description',
    ];

    protected $appends = ['average_rating'];

    protected static $logAttributes = [
        'title',
        'venue_category_id',
        'price',
        'featured',
        'approval_status',
        'operational_status',
    ];

    protected static $logOnlyDirty = true;

    protected static $recordEvents = ['created', 'updated', 'deleted'];

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

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(VenueCategory::class, 'venue_category_id');
    }

    public function features(): BelongsToMany
    {
        return $this->belongsToMany(
            VenueFeature::class,
            'venue_feature',
            'venue_id',
            'venue_feature_id',
        );
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    public function favorites(): HasMany
    {
        return $this->hasMany(Favorite::class);
    }

    public function country(): BelongsTo
    {
        return $this->belongsTo(Country::class);
    }

    public function county(): BelongsTo
    {
        return $this->belongsTo(County::class);
    }

    public function city(): BelongsTo
    {
        return $this->belongsTo(City::class);
    }

    public function locale(): BelongsTo
    {
        return $this->belongsTo(Locale::class);
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('approval_status', VenueApprovalStatus::Published->value)
            ->where('published_at', '<=', now());
    }

    public function scopeFeatured(Builder $query): Builder
    {
        return $query->where('featured', true);
    }

    public function getAverageRatingAttribute(): float
    {
        return $this->reviews()->approved()->avg('rating') ?? 0.0;
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('venue-gallery')->useDisk('public_uploads')->singleFile(false);
        $this->addMediaCollection('venue-cover')->useDisk('public_uploads')->singleFile();
        $this->addMediaCollection('venue-documents')->useDisk('public_uploads');
    }
}
