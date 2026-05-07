'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ShoppingCart, Check, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Product } from '@/lib/api';
import { addToCart } from '@/lib/api';
import { useCartStore } from '@/lib/cart-store';
import { formatPrice, getImageUrl } from '@/lib/utils';
import toast from 'react-hot-toast';

type Props = {
  product: Product;
  storeSlug: string;
  primaryColor: string;
  acceptsOrders: boolean;
};

export function ProductCard({ product, storeSlug, primaryColor, acceptsOrders }: Props) {
  const { sessionId, setCart } = useCartStore();
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!product.in_stock || adding) return;
    setAdding(true);
    try {
      const cart = await addToCart(storeSlug, sessionId, product.id, 1);
      setCart(storeSlug, cart);
      setAdded(true);
      toast.success(`${product.name} added to basket!`);
      setTimeout(() => setAdded(false), 2000);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to add to basket';
      toast.error(msg);
    } finally {
      setAdding(false);
    }
  };

  const hasDiscount = product.sale_price !== null;
  const discountPct = hasDiscount
    ? Math.round((1 - product.sale_price! / product.price) * 100)
    : 0;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col border border-gray-100 hover:-translate-y-0.5">
      {/* Image */}
      <div className="relative h-56 bg-gray-50 overflow-hidden">
        {product.image_url ? (
          <Image
            src={getImageUrl(product.image_url)}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-200">
            <Package size={56} />
          </div>
        )}
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
          {product.is_featured && (
            <span className="bg-amber-400 text-amber-900 text-xs font-black px-2.5 py-0.5 rounded-full shadow">
              Featured
            </span>
          )}
          {hasDiscount && (
            <span className="bg-red-500 text-white text-xs font-black px-2.5 py-0.5 rounded-full shadow">
              -{discountPct}% OFF
            </span>
          )}
        </div>
        {!product.in_stock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="bg-gray-800 text-white font-black text-sm px-4 py-2 rounded-full">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {product.category && (
          <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: primaryColor }}>
            {product.category.name}
          </p>
        )}
        <h3 className="font-bold text-gray-900 text-base leading-snug mb-1">{product.name}</h3>
        {product.short_description && (
          <p className="text-gray-500 text-sm line-clamp-2 mb-3 leading-relaxed flex-1">{product.short_description}</p>
        )}

        {/* Attributes */}
        {product.attributes && Object.keys(product.attributes).length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {Object.entries(product.attributes).map(([k, v]) => (
              <span key={k} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                {k}: {v}
              </span>
            ))}
          </div>
        )}

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
          <div>
            <p className="text-xl font-black text-gray-900">{formatPrice(product.current_price)}</p>
            {hasDiscount && (
              <p className="text-xs text-gray-400 line-through">{formatPrice(product.price)}</p>
            )}
          </div>
          {acceptsOrders && (
            <Button
              size="sm"
              onClick={handleAddToCart}
              loading={adding}
              disabled={!product.in_stock}
              className={added ? 'bg-green-500 text-white' : 'text-white'}
              style={!adding && !added && product.in_stock ? { background: primaryColor } : undefined}
            >
              {added ? <Check size={14} /> : <ShoppingCart size={14} />}
              {added ? 'Added!' : 'Add to Basket'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
