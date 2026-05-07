'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, Package, CreditCard, Shield } from 'lucide-react';
import type { Store } from '@/lib/api';
import { placeOrder } from '@/lib/api';
import { useCartStore } from '@/lib/cart-store';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import toast from 'react-hot-toast';

type Props = { store: Store };

export function CheckoutClient({ store }: Props) {
  const router = useRouter();
  const { getCartForStore, sessionId, clearStoreCart } = useCartStore();
  const cart = getCartForStore(store.slug);

  const [form, setForm] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    delivery_type: 'collection' as 'collection' | 'delivery',
    delivery_address: '',
    notes: '',
    payment_method: 'payfast' as 'payfast' | 'cash' | 'eft',
  });
  const [loading, setLoading] = useState(false);

  const deliveryFee = form.delivery_type === 'delivery' ? 50 : 0;
  const subtotal = cart?.subtotal ?? 0;
  const total = subtotal + deliveryFee;

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cart || cart.items.length === 0) {
      toast.error('Your basket is empty');
      return;
    }
    setLoading(true);
    try {
      const result = await placeOrder(store.slug, { ...form, session_id: sessionId });
      clearStoreCart(store.slug);

      if (result.payfast_data && form.payment_method === 'payfast') {
        const form_el = document.createElement('form');
        form_el.method = 'POST';
        form_el.action = result.payfast_data.url;
        Object.entries(result.payfast_data).forEach(([k, v]) => {
          if (k !== 'url') {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = k;
            input.value = v as string;
            form_el.appendChild(input);
          }
        });
        document.body.appendChild(form_el);
        form_el.submit();
      } else {
        router.push(`/order/${result.data.order_number}`);
      }
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to place order';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="text-center bg-white rounded-3xl p-12 shadow-sm border border-gray-100 max-w-md">
          <div className="text-5xl mb-4">🛒</div>
          <p className="text-2xl font-black text-gray-900 mb-2">Your basket is empty</p>
          <p className="text-gray-500 mb-6">Add some products before checking out.</p>
          <Link href={`/store/${store.slug}`}>
            <Button className="text-white" style={{ background: store.primary_color }}>
              ← Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-30 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link href={`/store/${store.slug}`} className="text-gray-400 hover:text-gray-900 p-2 rounded-xl hover:bg-gray-100 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="font-black text-gray-900 text-lg leading-none">Secure Checkout</h1>
            <p className="text-xs text-gray-500 mt-0.5">{store.name}</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5 text-gray-500 text-xs font-semibold">
            <Shield size={14} className="text-green-600" />
            <span className="text-green-700">SSL Secured</span>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8 grid md:grid-cols-5 gap-8">
        {/* Form */}
        <form onSubmit={handleSubmit} className="md:col-span-3 space-y-5">

          {/* Step 1: Details */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-black text-gray-900 text-base mb-4 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full text-white text-xs flex items-center justify-center font-black"
                style={{ background: store.primary_color }}>1</span>
              Your Details
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">Full Name *</label>
                <input
                  required
                  value={form.customer_name}
                  onChange={(e) => set('customer_name', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-colors"
                  placeholder="Jane Smith"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">Phone Number *</label>
                <input
                  required
                  value={form.customer_phone}
                  onChange={(e) => set('customer_phone', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-colors"
                  placeholder="082 123 4567"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-semibold text-gray-700 block mb-1">Email Address *</label>
                <input
                  required
                  type="email"
                  value={form.customer_email}
                  onChange={(e) => set('customer_email', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-colors"
                  placeholder="jane@example.com"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Delivery */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-black text-gray-900 text-base mb-4 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full text-white text-xs flex items-center justify-center font-black"
                style={{ background: store.primary_color }}>2</span>
              Delivery Method
            </h2>
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              {[
                { v: 'collection', label: 'Collection', desc: 'Pick up at our location — FREE', Icon: Package },
                { v: 'delivery', label: 'Delivery', desc: 'Delivered to your door — R50 fee', Icon: MapPin },
              ].map((opt) => (
                <label
                  key={opt.v}
                  className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    form.delivery_type === opt.v ? '' : 'border-gray-100 hover:border-gray-200'
                  }`}
                  style={form.delivery_type === opt.v ? { borderColor: store.primary_color } : undefined}
                >
                  <input
                    type="radio"
                    name="delivery_type"
                    value={opt.v}
                    checked={form.delivery_type === opt.v}
                    onChange={(e) => set('delivery_type', e.target.value)}
                    className="mt-0.5"
                  />
                  <div>
                    <opt.Icon size={16} className="mb-1" style={{ color: store.primary_color }} />
                    <p className="font-black text-sm text-gray-900">{opt.label}</p>
                    <p className="text-xs text-gray-500">{opt.desc}</p>
                  </div>
                </label>
              ))}
            </div>
            {form.delivery_type === 'delivery' && (
              <div className="mb-4">
                <label className="text-sm font-semibold text-gray-700 block mb-1">Delivery Address *</label>
                <textarea
                  required
                  rows={3}
                  value={form.delivery_address}
                  onChange={(e) => set('delivery_address', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-colors resize-none"
                  placeholder="123 Main St, Cape Town, 8001"
                />
              </div>
            )}
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1">Special Instructions (optional)</label>
              <textarea
                rows={2}
                value={form.notes}
                onChange={(e) => set('notes', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none transition-colors resize-none"
                placeholder="Any special requests..."
              />
            </div>
          </div>

          {/* Step 3: Payment */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-black text-gray-900 text-base mb-4 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full text-white text-xs flex items-center justify-center font-black"
                style={{ background: store.primary_color }}>3</span>
              Payment Method
            </h2>
            <div className="space-y-2">
              {[
                { v: 'payfast', label: 'PayFast (Card / EFT / SnapScan)', desc: 'Secure online payment — instant confirmation', icon: '💳' },
                { v: 'eft', label: 'Manual EFT', desc: 'Bank transfer — confirmed once payment clears', icon: '🏦' },
                { v: 'cash', label: 'Cash on Collection', desc: 'Pay in cash when you collect your order', icon: '💵' },
              ].map((opt) => (
                <label
                  key={opt.v}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                    form.payment_method === opt.v ? '' : 'border-gray-100 hover:border-gray-200'
                  }`}
                  style={form.payment_method === opt.v ? { borderColor: store.primary_color } : undefined}
                >
                  <input
                    type="radio"
                    name="payment_method"
                    value={opt.v}
                    checked={form.payment_method === opt.v}
                    onChange={(e) => set('payment_method', e.target.value)}
                  />
                  <span className="text-xl">{opt.icon}</span>
                  <div>
                    <p className="font-bold text-sm text-gray-900">{opt.label}</p>
                    <p className="text-xs text-gray-500">{opt.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <Button type="submit" size="lg" loading={loading} className="w-full text-white font-black text-base"
            style={{ background: store.primary_color }}>
            <CreditCard size={18} />
            Place Order — {formatPrice(total)}
          </Button>

          <p className="text-xs text-center text-gray-400">
            🔒 Encrypted &amp; secure. 📦 Shipped discreetly in plain packaging.
          </p>
        </form>

        {/* Order Summary */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
            <h2 className="font-black text-gray-900 text-base mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
              {cart.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600 truncate flex-1 pr-2">{item.product_name} × {item.quantity}</span>
                  <span className="font-bold text-gray-900 flex-shrink-0">{formatPrice(item.subtotal)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-3 space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Delivery</span>
                <span>{deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}</span>
              </div>
              <div className="flex justify-between font-black text-xl text-gray-900 pt-2 border-t border-gray-100">
                <span>Total</span>
                <span style={{ color: store.primary_color }}>{formatPrice(total)}</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-gray-50 rounded-xl text-xs text-gray-500 leading-relaxed">
              📦 Your order will be shipped in plain, unmarked packaging with no product references.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
