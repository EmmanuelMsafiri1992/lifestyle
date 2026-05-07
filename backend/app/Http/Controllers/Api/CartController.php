<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use App\Models\Store;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CartController extends Controller
{
    private function getCart(Request $request, Store $store): Cart
    {
        $sessionId = $request->header('X-Cart-Session') ?? $request->input('session_id');

        return Cart::firstOrCreate(
            ['store_id' => $store->id, 'session_id' => $sessionId],
            ['store_id' => $store->id, 'session_id' => $sessionId]
        );
    }

    public function show(Request $request, string $storeSlug): JsonResponse
    {
        $store = Store::where('slug', $storeSlug)->firstOrFail();
        $cart = $this->getCart($request, $store);

        return response()->json(['data' => $this->formatCart($cart)]);
    }

    public function addItem(Request $request, string $storeSlug): JsonResponse
    {
        $request->validate([
            'product_id' => 'required|integer',
            'quantity' => 'required|integer|min:1|max:99',
        ]);

        $store = Store::where('slug', $storeSlug)->firstOrFail();
        $product = Product::where('id', $request->product_id)
            ->where('store_id', $store->id)
            ->where('is_active', true)
            ->firstOrFail();

        if ($product->track_stock && $product->stock < $request->quantity) {
            return response()->json(['message' => 'Insufficient stock'], 422);
        }

        $cart = $this->getCart($request, $store);

        $item = $cart->items()->where('product_id', $product->id)->first();
        if ($item) {
            $item->update(['quantity' => $item->quantity + $request->quantity]);
        } else {
            $cart->items()->create(['product_id' => $product->id, 'quantity' => $request->quantity]);
        }

        return response()->json(['data' => $this->formatCart($cart->fresh(['items.product']))]);
    }

    public function updateItem(Request $request, string $storeSlug, int $itemId): JsonResponse
    {
        $request->validate(['quantity' => 'required|integer|min:1|max:99']);

        $store = Store::where('slug', $storeSlug)->firstOrFail();
        $cart = $this->getCart($request, $store);
        $item = $cart->items()->findOrFail($itemId);
        $item->update(['quantity' => $request->quantity]);

        return response()->json(['data' => $this->formatCart($cart->fresh(['items.product']))]);
    }

    public function removeItem(Request $request, string $storeSlug, int $itemId): JsonResponse
    {
        $store = Store::where('slug', $storeSlug)->firstOrFail();
        $cart = $this->getCart($request, $store);
        $cart->items()->findOrFail($itemId)->delete();

        return response()->json(['data' => $this->formatCart($cart->fresh(['items.product']))]);
    }

    public function clear(Request $request, string $storeSlug): JsonResponse
    {
        $store = Store::where('slug', $storeSlug)->firstOrFail();
        $cart = $this->getCart($request, $store);
        $cart->items()->delete();

        return response()->json(['data' => $this->formatCart($cart->fresh(['items.product']))]);
    }

    private function formatCart(Cart $cart): array
    {
        $items = $cart->items;
        $subtotal = $items->sum(fn($i) => $i->product->current_price * $i->quantity);

        return [
            'id' => $cart->id,
            'session_id' => $cart->session_id,
            'items' => $items->map(fn($i) => [
                'id' => $i->id,
                'product_id' => $i->product_id,
                'product_name' => $i->product->name,
                'product_image' => $i->product->image_url,
                'price' => (float) $i->product->current_price,
                'quantity' => $i->quantity,
                'subtotal' => round($i->product->current_price * $i->quantity, 2),
            ]),
            'subtotal' => round($subtotal, 2),
            'item_count' => $items->sum('quantity'),
        ];
    }
}
