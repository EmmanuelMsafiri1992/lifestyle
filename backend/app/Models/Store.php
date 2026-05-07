<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Store extends Model
{
    protected $fillable = [
        'name', 'slug', 'description', 'tagline', 'logo', 'banner',
        'type', 'requires_age_gate', 'min_age', 'is_active', 'accepts_orders',
        'primary_color', 'phone', 'email', 'address', 'whatsapp',
        'social_links', 'sort_order',
    ];

    protected $casts = [
        'requires_age_gate' => 'boolean',
        'is_active' => 'boolean',
        'accepts_orders' => 'boolean',
        'social_links' => 'array',
    ];

    public function categories(): HasMany
    {
        return $this->hasMany(Category::class)->orderBy('sort_order');
    }

    public function products(): HasMany
    {
        return $this->hasMany(Product::class)->orderBy('sort_order');
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    public function getLogoUrlAttribute(): ?string
    {
        return $this->logo ? asset('storage/' . $this->logo) : null;
    }

    public function getBannerUrlAttribute(): ?string
    {
        return $this->banner ? asset('storage/' . $this->banner) : null;
    }
}
