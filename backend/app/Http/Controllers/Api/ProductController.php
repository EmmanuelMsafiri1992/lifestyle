<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Store;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request, string $storeSlug): JsonResponse
    {
        $store = Store::where('slug', $storeSlug)->firstOrFail();

        $query = $store->products()->where('is_active', true)->with('category');

        if ($request->category) {
            $query->whereHas('category', fn($q) => $q->where('slug', $request->category));
        }
        if ($request->featured) {
            $query->where('is_featured', true);
        }
        if ($request->search) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $products = $query->orderBy('sort_order')->get()->map(fn($p) => $this->format($p));

        return response()->json(['data' => $products]);
    }

    public function show(string $storeSlug, string $slug): JsonResponse
    {
        $store = Store::where('slug', $storeSlug)->firstOrFail();
        $product = $store->products()->where('slug', $slug)->where('is_active', true)->with('category')->firstOrFail();

        return response()->json(['data' => $this->format($product)]);
    }

    private function format(Product $p): array
    {
        return [
            'id' => $p->id,
            'store_id' => $p->store_id,
            'category_id' => $p->category_id,
            'category' => $p->category ? ['id' => $p->category->id, 'name' => $p->category->name, 'slug' => $p->category->slug] : null,
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
        ];
    }
}
