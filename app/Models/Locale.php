<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Locale extends Model
{
    use HasFactory;

    protected $fillable = ['city_id', 'name', 'slug'];

    public function city(): BelongsTo { return $this->belongsTo(City::class); }
    public function venues(): HasMany { return $this->hasMany(Venue::class); }
}
