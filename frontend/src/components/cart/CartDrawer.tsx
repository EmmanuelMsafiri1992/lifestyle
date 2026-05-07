'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/cart-store';
import { updateCartItem, removeCartItem } from '@/lib/api';
import { formatPrice, getImageUrl } from '@/lib/utils';
import toast from 'react-hot-toast';

type Props = {
  open: boolean;
  onClose: () => void;
  storeSlug: string;
  storeColor: string;
};

export function CartDrawer({ open, onClose, storeSlug, storeColor }: Props) {
  const { getCartForStore, setCart, sessionId } = useCartStore();
  const cart = getCartForStore(storeSlug);
  const [loadingItem, setLoadingItem] = useState<number | null>(null);

  const handleQtyChange = async (itemId: number, qty: number) => {
    if (qty < 1) return;
    setLoadingItem(itemId);
    try {
      const updated = await updateCartItem(storeSlug, sessionId, itemId, qty);
      setCart(storeSlug, updated);
    } catch {
      toast.error('Failed to update quantity');
    } finally {
      setLoadingItem(null);
    }
  };

  const handleRemove = async (itemId: number) => {
    setLoadingItem(itemId);
    try {
      const updated = await removeCartItem(storeSlug, sessionId, itemId);
      setCart(storeSlug, updated);
      toast.success('Item removed from basket');
    } catch {
      toast.error('Failed to remove item');
    } finally {
      setLoadingItem(null);
    }
  };

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b" style={{ background: storeColor }}>
          <div className="flex items-center gap-2 text-white">
            <ShoppingBag size={20} />
            <span className="font-black text-lg">Your Basket</span>
            {cart && cart.item_count > 0 && (
              <span className="bg-white/25 text-white text-xs px-2 py-0.5 rounded-full font-bold">{cart.item_count}</span>
            )}
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/20 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {!cart || cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 gap-4 py-16">
              <ShoppingBag size={56} className="opacity-20" />
              <div>
                <p className="font-black text-gray-500 text-lg">Basket is empty</p>
                <p className="text-sm text-gray-400 mt-1">Add products to get started</p>
              </div>
              <button onClick={onClose} className="text-sm font-bold underline" style={{ color: storeColor }}>
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.items.map((item) => (
              <div key={item.id} className="flex gap-3 bg-gray-50 rounded-xl p-3 border border-gray-100">
                {item.product_image && (
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-white">
                    <Image src={getImageUrl(item.product_image)} alt={item.product_name} fill className="object-cover" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-gray-900 truncate">{item.product_name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{formatPrice(item.price)} each</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => handleQtyChange(item.id, item.quantity - 1)}
                      disabled={loadingItem === item.id || item.quantity <= 1}
                      className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 disabled:opacity-40 transition-colors"
                    >
                      <Minus size={11} />
                    </button>
                    <span className="w-6 text-center text-sm font-black">{item.quantity}</span>
                    <button
                      onClick={() => handleQtyChange(item.id, item.quantity + 1)}
                      disabled={loadingItem === item.id}
                      className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 disabled:opacity-40 transition-colors"
                    >
                      <Plus size={11} />
                    </button>
                    <button
                      onClick={() => handleRemove(item.id)}
                      disabled={loadingItem === item.id}
                      className="ml-auto text-red-400 hover:text-red-600 p-1 rounded-lg disabled:opacity-40 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-black text-sm text-gray-900">{formatPrice(item.subtotal)}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart && cart.items.length > 0 && (
          <div className="border-t p-4 space-y-3 bg-gray-50">
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-700">Subtotal</span>
              <span className="font-black text-xl text-gray-900">{formatPrice(cart.subtotal)}</span>
            </div>
            <p className="text-xs text-gray-500">Delivery fee calculated at checkout</p>
            <Link href={`/store/${storeSlug}/checkout`} onClick={onClose}>
              <Button className="w-full text-white font-black" size="lg" style={{ background: storeColor }}>
                Checkout →
              </Button>
            </Link>
            <p className="text-xs text-center text-gray-400">🔒 Secure & discreet checkout</p>
          </div>
        )}
      </div>
    </>
  );
}
