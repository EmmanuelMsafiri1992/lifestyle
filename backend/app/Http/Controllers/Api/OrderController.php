<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Order;
use App\Models\Store;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function store(Request $request, string $storeSlug): JsonResponse
    {
        $request->validate([
            'session_id' => 'required|string',
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email',
            'customer_phone' => 'required|string|max:20',
            'delivery_type' => 'required|in:collection,delivery',
            'delivery_address' => 'required_if:delivery_type,delivery|string|nullable',
            'notes' => 'nullable|string|max:500',
            'payment_method' => 'required|in:payfast,cash,eft',
        ]);

        $store = Store::where('slug', $storeSlug)->firstOrFail();

        $cart = Cart::where('session_id', $request->session_id)
            ->where('store_id', $store->id)
            ->with('items.product')
            ->firstOrFail();

        if ($cart->items->isEmpty()) {
            return response()->json(['message' => 'Cart is empty'], 422);
        }

        $subtotal = $cart->items->sum(fn($i) => $i->product->current_price * $i->quantity);
        $deliveryFee = $request->delivery_type === 'delivery' ? 50 : 0;
        $tax = round($subtotal * 0.15, 2);
        $total = round($subtotal + $deliveryFee, 2);

        $order = DB::transaction(function () use ($request, $store, $cart, $subtotal, $deliveryFee, $tax, $total) {
            $order = Order::create([
                'store_id' => $store->id,
                'user_id' => $request->user()?->id,
                'order_number' => 'ORD-' . strtoupper(substr($store->type, 0, 3)) . '-' . date('Ymd') . '-' . str_pad(random_int(1, 9999), 4, '0', STR_PAD_LEFT),
                'status' => 'pending',
                'payment_status' => 'pending',
                'payment_method' => $request->payment_method,
                'delivery_type' => $request->delivery_type,
                'subtotal' => $subtotal,
                'delivery_fee' => $deliveryFee,
                'tax' => $tax,
                'total' => $total,
                'customer_name' => $request->customer_name,
                'customer_email' => $request->customer_email,
                'customer_phone' => $request->customer_phone,
                'delivery_address' => $request->delivery_address,
                'notes' => $request->notes,
            ]);

            foreach ($cart->items as $item) {
                $order->items()->create([
                    'product_id' => $item->product_id,
                    'product_name' => $item->product->name,
                    'price' => $item->product->current_price,
                    'quantity' => $item->quantity,
                    'subtotal' => $item->product->current_price * $item->quantity,
                ]);

                if ($item->product->track_stock) {
                    $item->product->decrement('stock', $item->quantity);
                }
            }

            $cart->items()->delete();

            return $order;
        });

        return response()->json([
            'data' => $this->format($order->load('items')),
            'payfast_data' => $request->payment_method === 'payfast' ? $this->buildPayfastData($order) : null,
        ], 201);
    }

    public function show(string $orderNumber): JsonResponse
    {
        $order = Order::where('order_number', $orderNumber)->with(['items', 'store'])->firstOrFail();

        return response()->json(['data' => $this->format($order)]);
    }

    public function payfastNotify(Request $request): void
    {
        $orderNumber = $request->input('m_payment_id');
        $order = Order::where('order_number', $orderNumber)->first();

        if ($order && $request->input('payment_status') === 'COMPLETE') {
            $order->update([
                'payment_status' => 'paid',
                'status' => 'confirmed',
                'payment_reference' => $request->input('pf_payment_id'),
                'confirmed_at' => now(),
            ]);
        }
    }

    private function buildPayfastData(Order $order): array
    {
        $merchantId = config('services.payfast.merchant_id', '10000100');
        $merchantKey = config('services.payfast.merchant_key', '46f0cd694581a');
        $sandbox = config('services.payfast.sandbox', true);

        $baseUrl = $sandbox ? 'https://sandbox.payfast.co.za/eng/process' : 'https://www.payfast.co.za/eng/process';

        return [
            'url' => $baseUrl,
            'merchant_id' => $merchantId,
            'merchant_key' => $merchantKey,
            'return_url' => config('app.frontend_url') . '/order/' . $order->order_number . '/success',
            'cancel_url' => config('app.frontend_url') . '/order/' . $order->order_number . '/cancel',
            'notify_url' => config('app.url') . '/api/payfast/notify',
            'name_first' => explode(' ', $order->customer_name)[0],
            'name_last' => implode(' ', array_slice(explode(' ', $order->customer_name), 1)) ?: '',
            'email_address' => $order->customer_email,
            'm_payment_id' => $order->order_number,
            'amount' => number_format($order->total, 2, '.', ''),
            'item_name' => 'Order ' . $order->order_number,
        ];
    }

    private function format(Order $order): array
    {
        return [
            'id' => $order->id,
            'order_number' => $order->order_number,
            'status' => $order->status,
            'payment_status' => $order->payment_status,
            'payment_method' => $order->payment_method,
            'delivery_type' => $order->delivery_type,
            'subtotal' => (float) $order->subtotal,
            'delivery_fee' => (float) $order->delivery_fee,
            'tax' => (float) $order->tax,
            'total' => (float) $order->total,
            'customer_name' => $order->customer_name,
            'customer_email' => $order->customer_email,
            'customer_phone' => $order->customer_phone,
            'delivery_address' => $order->delivery_address,
            'notes' => $order->notes,
            'store' => $order->store ? ['name' => $order->store->name, 'slug' => $order->store->slug] : null,
            'items' => $order->items->map(fn($i) => [
                'id' => $i->id,
                'product_name' => $i->product_name,
                'price' => (float) $i->price,
                'quantity' => $i->quantity,
                'subtotal' => (float) $i->subtotal,
            ]),
            'created_at' => $order->created_at?->toISOString(),
        ];
    }
}
