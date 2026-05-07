'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { use } from 'react';
import { getOrder, type Order } from '@/lib/api';
import { formatPrice } from '@/lib/utils';

export default function OrderPage({ params }: { params: Promise<{ orderNumber: string }> }) {
  const { orderNumber } = use(params);
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    getOrder(orderNumber)
      .then(setOrder)
      .catch(() => setError(true));
  }, [orderNumber]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="text-center bg-white rounded-3xl p-12 shadow-sm border max-w-md">
          <div className="text-5xl mb-4">⚠️</div>
          <p className="text-xl font-black text-gray-900 mb-2">Order not found</p>
          <p className="text-gray-500 mb-6">We couldn&apos;t find order #{orderNumber}.</p>
          <Link href="/" className="text-blue-600 font-bold hover:underline">← Back to Home</Link>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Loading your order...</p>
        </div>
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    pending: '#f59e0b',
    confirmed: '#3b82f6',
    processing: '#8b5cf6',
    shipped: '#06b6d4',
    delivered: '#22c55e',
    cancelled: '#ef4444',
  };

  const paymentColors: Record<string, string> = {
    paid: '#22c55e',
    pending: '#f59e0b',
    failed: '#ef4444',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="font-black text-gray-900 text-lg">LifeStyle Boutique</Link>
          {order.store && (
            <Link href={`/store/${order.store.slug}`} className="text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">
              ← Back to {order.store.name}
            </Link>
          )}
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Success Banner */}
        <div className="bg-green-50 border border-green-200 rounded-3xl p-8 mb-6 text-center">
          <div className="text-5xl mb-3">🎉</div>
          <h1 className="text-3xl font-black text-green-800 mb-2">Order Placed!</h1>
          <p className="text-green-700">Thank you, {order.customer_name}. Your order has been received.</p>
          <div className="mt-4 inline-block bg-white border border-green-200 px-4 py-2 rounded-full">
            <span className="text-xs text-gray-500 font-semibold">Order Number: </span>
            <span className="font-black text-gray-900">#{order.order_number}</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 mb-6">
          {/* Status */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Order Status</p>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ background: statusColors[order.status] ?? '#6b7280' }} />
              <span className="font-black text-gray-900 capitalize">{order.status}</span>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Payment</p>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ background: paymentColors[order.payment_status] ?? '#6b7280' }} />
              <span className="font-black text-gray-900 capitalize">{order.payment_status}</span>
              <span className="text-gray-400 text-sm">· {order.payment_method.toUpperCase()}</span>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-5 overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h2 className="font-black text-gray-900">Items Ordered</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between items-center px-5 py-3.5 text-sm">
                <span className="text-gray-700">{item.product_name} <span className="text-gray-400">×{item.quantity}</span></span>
                <span className="font-bold text-gray-900">{formatPrice(item.subtotal)}</span>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 px-5 py-4 space-y-2">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Subtotal</span><span>{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Delivery</span><span>{order.delivery_fee === 0 ? 'FREE' : formatPrice(order.delivery_fee)}</span>
            </div>
            <div className="flex justify-between font-black text-xl text-gray-900 pt-2 border-t border-gray-200">
              <span>Total</span><span>{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Delivery info */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm mb-6">
          <h2 className="font-black text-gray-900 mb-3">Delivery Information</h2>
          <div className="text-sm text-gray-600 space-y-1">
            <p><span className="font-semibold">Method:</span> {order.delivery_type === 'delivery' ? '🚚 Home Delivery' : '📦 Collection'}</p>
            {order.delivery_address && <p><span className="font-semibold">Address:</span> {order.delivery_address}</p>}
            {order.notes && <p><span className="font-semibold">Notes:</span> {order.notes}</p>}
          </div>
        </div>

        {/* EFT instructions */}
        {order.payment_method === 'eft' && order.payment_status === 'pending' && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6">
            <h3 className="font-black text-amber-900 mb-2">⏳ EFT Payment Instructions</h3>
            <p className="text-sm text-amber-800 mb-3">Please make your EFT payment to complete your order:</p>
            <div className="bg-white rounded-xl p-4 text-sm space-y-1 text-gray-700 font-mono">
              <p><strong>Bank:</strong> FNB</p>
              <p><strong>Account Name:</strong> LifeStyle Boutique</p>
              <p><strong>Reference:</strong> {order.order_number}</p>
              <p><strong>Amount:</strong> {formatPrice(order.total)}</p>
            </div>
            <p className="text-xs text-amber-700 mt-3">Your order will be confirmed once payment is received. Please use your order number as the reference.</p>
          </div>
        )}

        <div className="text-center">
          {order.store ? (
            <Link href={`/store/${order.store.slug}`}
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-2xl font-black hover:bg-gray-800 transition-colors">
              ← Continue Shopping
            </Link>
          ) : (
            <Link href="/"
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-2xl font-black hover:bg-gray-800 transition-colors">
              ← Back to Home
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
