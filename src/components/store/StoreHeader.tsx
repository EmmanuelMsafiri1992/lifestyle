'use client';

import Link from 'next/link';
import { ShoppingCart, ChevronLeft } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import type { Store } from '@/lib/api';

type Props = {
  store: Store;
  onCartClick: () => void;
};

export function StoreHeader({ store, onCartClick }: Props) {
  const { getCartForStore } = useCartStore();
  const cart = getCartForStore(store.slug);
  const itemCount = cart?.item_count ?? 0;

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
      {/* Top announcement bar */}
      <div className="text-white text-center text-xs py-1.5 px-4 font-semibold" style={{ background: store.primary_color }}>
        🔞 Strictly 18+ &nbsp;·&nbsp; Discreet Packaging &nbsp;·&nbsp; Secure Checkout
      </div>

      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        {/* Back */}
        <Link href="/" className="flex items-center gap-1 text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors flex-shrink-0">
          <ChevronLeft size={18} />
          <span className="hidden sm:inline">All Stores</span>
        </Link>

        {/* Logo + Name */}
        <div className="flex items-center gap-3 flex-1">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm flex-shrink-0"
            style={{ background: store.primary_color }}>
            {store.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <h1 className="font-black text-gray-900 text-base leading-none truncate">{store.name}</h1>
            {store.tagline && <p className="text-xs text-gray-500 truncate mt-0.5">{store.tagline}</p>}
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {store.whatsapp && (
            <a
              href={`https://wa.me/${store.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-full text-xs font-bold transition-colors"
            >
              💬 WhatsApp
            </a>
          )}

          {store.accepts_orders && (
            <button
              onClick={onCartClick}
              className="relative flex items-center gap-2 px-3 py-2 rounded-xl border-2 font-bold text-sm transition-all hover:scale-105"
              style={{ borderColor: store.primary_color, color: store.primary_color }}
            >
              <ShoppingCart size={18} />
              <span className="hidden sm:inline">Cart</span>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-black"
                  style={{ background: store.primary_color }}>
                  {itemCount}
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
