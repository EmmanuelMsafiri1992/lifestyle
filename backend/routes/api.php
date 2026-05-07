<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\StoreController;
use Illuminate\Support\Facades\Route;

// Auth routes
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);
    });
});

// Stores
Route::get('/stores', [StoreController::class, 'index']);
Route::get('/stores/{slug}', [StoreController::class, 'show']);

// Products per store
Route::get('/stores/{storeSlug}/products', [ProductController::class, 'index']);
Route::get('/stores/{storeSlug}/products/{slug}', [ProductController::class, 'show']);

// Cart per store (session-based)
Route::prefix('stores/{storeSlug}/cart')->group(function () {
    Route::get('/', [CartController::class, 'show']);
    Route::post('/items', [CartController::class, 'addItem']);
    Route::put('/items/{itemId}', [CartController::class, 'updateItem']);
    Route::delete('/items/{itemId}', [CartController::class, 'removeItem']);
    Route::delete('/', [CartController::class, 'clear']);
});

// Orders
Route::post('/stores/{storeSlug}/orders', [OrderController::class, 'store']);
Route::get('/orders/{orderNumber}', [OrderController::class, 'show']);

// PayFast notification (IPN)
Route::post('/payfast/notify', [OrderController::class, 'payfastNotify']);

// Authenticated routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/my-orders', function (\Illuminate\Http\Request $request) {
        $orders = $request->user()->orders()->with(['store', 'items'])->latest()->get();
        return response()->json(['data' => $orders]);
    });
});
