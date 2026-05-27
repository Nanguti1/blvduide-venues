<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class City extends Model
{
    use HasFactory;

    protected $fillable = ['county_id', 'name', 'slug'];

    public function county(): BelongsTo { return $this->belongsTo(County::class); }
    public function locales(): HasMany { return $this->hasMany(Locale::class); }
}
