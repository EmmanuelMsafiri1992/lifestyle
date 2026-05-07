<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Store;
use Illuminate\Http\JsonResponse;

class StoreController extends Controller
{
    public function index(): JsonResponse
    {
        $stores = Store::where('is_active', true)
            ->orderBy('sort_order')
            ->get()
            ->map(fn($s) => $this->format($s));

        return response()->json(['data' => $stores]);
    }

    public function show(string $slug): JsonResponse
    {
        $store = Store::where('slug', $slug)->where('is_active', true)->firstOrFail();

        $categories = $store->categories()
            ->where('is_active', true)
            ->with(['products' => fn($q) => $q->where('is_active', true)->orderBy('sort_order')])
            ->orderBy('sort_order')
            ->get()
            ->map(fn($c) => [
                'id' => $c->id,
                'name' => $c->name,
                'slug' => $c->slug,
                'description' => $c->description,
                'image_url' => $c->image_url,
                'products' => $c->products->map(fn($p) => $this->formatProduct($p)),
            ]);

        $featured = $store->products()
            ->where('is_active', true)
            ->where('is_featured', true)
            ->with('category')
            ->get()
            ->map(fn($p) => $this->formatProduct($p));

        return response()->json([
            'data' => array_merge($this->format($store), [
                'categories' => $categories,
                'featured_products' => $featured,
            ]),
        ]);
    }

    private function format(Store $store): array
    {
        return [
            'id' => $store->id,
            'name' => $store->name,
            'slug' => $store->slug,
            'description' => $store->description,
            'tagline' => $store->tagline,
            'type' => $store->type,
            'requires_age_gate' => $store->requires_age_gate,
            'min_age' => $store->min_age,
            'accepts_orders' => $store->accepts_orders,
            'primary_color' => $store->primary_color,
            'logo_url' => $store->logo_url,
            'banner_url' => $store->banner_url,
            'phone' => $store->phone,
            'email' => $store->email,
            'address' => $store->address,
            'whatsapp' => $store->whatsapp,
            'social_links' => $store->social_links,
        ];
    }

    private function formatProduct($p): array
    {
        return [
            'id' => $p->id,
            'name' => $p->name,
            'slug' => $p->slug,
            'description' => $p->description,
            'short_description' => $p->short_description,
            'price' => (float) $p->price,
            'sale_price' => $p->sale_price ? (float) $p->sale_price : null,
            'current_price' => (float) $p->current_price,
            'image_url' => $p->image_url,
            'gallery' => $p->gallery,
            'stock' => $p->stock,
            'in_stock' => $p->in_stock,
            'is_featured' => $p->is_featured,
            'unit' => $p->unit,
            'attributes' => $p->attributes,
            'category_id' => $p->category_id,
        ];
    }
}
