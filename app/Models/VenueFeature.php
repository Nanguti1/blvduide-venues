<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class VenueFeature extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'slug'];

    public function venues(): BelongsToMany
    {
        return $this->belongsToMany(
            Venue::class,
            'venue_feature',
            'venue_feature_id',
            'venue_id',
        );
    }
}
