'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { Store } from '@/lib/api';
import { StoreHeader } from '@/components/store/StoreHeader';
import { ProductCard } from '@/components/store/ProductCard';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { AgeGate } from '@/components/store/AgeGate';
import { getImageUrl } from '@/lib/utils';
import Link from 'next/link';

type Props = { store: Store };

export function StorePageClient({ store }: Props) {
  const router = useRouter();
  const [ageVerified, setAgeVerified] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    if (!store.requires_age_gate) {
      setAgeVerified(true);
      return;
    }
    const key = `age_verified_${store.slug}`;
    if (sessionStorage.getItem(key) === 'true') setAgeVerified(true);
  }, [store]);

  const handleAgeVerified = () => {
    sessionStorage.setItem(`age_verified_${store.slug}`, 'true');
    setAgeVerified(true);
  };

  const handleAgeDenied = () => router.push('/');

  const allProducts = store.categories?.flatMap((c) => c.products) ?? [];
  const categories = store.categories ?? [];
  const displayedProducts =
    activeCategory === 'all'
      ? allProducts
      : store.categories?.find((c) => c.slug === activeCategory)?.products ?? [];

  const featuredProducts = store.featured_products ?? [];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Age Gate */}
      {store.requires_age_gate && !ageVerified && (
        <AgeGate
          storeName={store.name}
          storeColor={store.primary_color}
          minAge={store.min_age}
          onVerified={handleAgeVerified}
          onDenied={handleAgeDenied}
        />
      )}

      <StoreHeader store={store} onCartClick={() => setCartOpen(true)} />

      {/* Hero Banner */}
      <section
        className="relative py-16 md:py-24 px-6 text-white text-center overflow-hidden"
        style={{ background: store.primary_color }}
      >
        {store.banner_url && (
          <Image
            src={getImageUrl(store.banner_url)}
            alt="Store banner"
            fill
            className="object-cover opacity-20"
            priority
          />
        )}
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black mb-3 leading-tight">{store.name}</h1>
          {store.tagline && (
            <p className="text-xl md:text-2xl text-white/90 mb-4 font-medium italic">&ldquo;{store.tagline}&rdquo;</p>
          )}
          <p className="text-white/75 max-w-xl mx-auto leading-relaxed">{store.description}</p>
          {store.accepts_orders && (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm">
              <span className="bg-white/15 border border-white/30 px-4 py-1.5 rounded-full font-semibold">🔒 Secure Checkout</span>
              <span className="bg-white/15 border border-white/30 px-4 py-1.5 rounded-full font-semibold">📦 Discreet Packaging</span>
              <span className="bg-white/15 border border-white/30 px-4 py-1.5 rounded-full font-semibold">✅ 18+ Verified</span>
            </div>
          )}
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-2 text-xs text-gray-500 flex items-center gap-1.5">
          <Link href="/" className="hover:text-gray-900 font-medium">Home</Link>
          <span>›</span>
          <span className="text-gray-900 font-medium">{store.name}</span>
        </div>
      </div>

      {/* Category Tabs */}
      {categories.length > 0 && store.accepts_orders && (
        <div className="bg-white border-b border-gray-100 sticky top-[104px] z-30 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 overflow-x-auto">
            <div className="flex gap-1 py-2 min-w-max">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-5 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${
                  activeCategory === 'all' ? 'text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
                style={activeCategory === 'all' ? { background: store.primary_color } : undefined}
              >
                All Products {allProducts.length > 0 && `(${allProducts.length})`}
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`px-5 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${
                    activeCategory === cat.slug ? 'text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  style={activeCategory === cat.slug ? { background: store.primary_color } : undefined}
                >
                  {cat.name} {cat.products.length > 0 && `(${cat.products.length})`}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main */}
      <main className="flex-1 max-w-6xl mx-auto px-4 py-10 w-full">
        {store.accepts_orders ? (
          <>
            {/* Featured strip */}
            {featuredProducts.length > 0 && activeCategory === 'all' && (
              <div className="mb-10">
                <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-amber-400">★</span> Featured Products
                </h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {featuredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      storeSlug={store.slug}
                      primaryColor={store.primary_color}
                      acceptsOrders={store.accepts_orders}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Section title */}
            <h2 className="text-xl font-black text-gray-900 mb-6">
              {activeCategory === 'all'
                ? 'All Products'
                : categories.find((c) => c.slug === activeCategory)?.name ?? 'Products'}
            </h2>

            {displayedProducts.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <p className="text-lg font-semibold">No products in this category yet.</p>
                <p className="text-sm mt-1">Check back soon or contact us for availability.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {displayedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    storeSlug={store.slug}
                    primaryColor={store.primary_color}
                    acceptsOrders={store.accepts_orders}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🚧</div>
            <p className="text-2xl font-black text-gray-900 mb-2">Coming Soon</p>
            <p className="text-gray-500">Online ordering will be available soon. Contact us directly in the meantime.</p>
          </div>
        )}
      </main>

      {/* Contact strip */}
      {(store.phone || store.whatsapp) && (
        <section className="border-t border-gray-100 py-8 px-4 text-center bg-gray-50">
          <p className="text-gray-500 text-sm mb-3">Need help or have a question?</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {store.phone && (
              <a href={`tel:${store.phone}`} className="font-bold text-gray-900 hover:underline text-sm">
                📞 {store.phone}
              </a>
            )}
            {store.whatsapp && (
              <a href={`https://wa.me/${store.whatsapp}`} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm font-bold transition-colors">
                💬 WhatsApp Us
              </a>
            )}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-6 px-4 text-center text-xs border-t border-gray-800">
        <p className="mb-1">© {new Date().getFullYear()} LifeStyle Boutique — {store.name}</p>
        <p>Strictly for persons 18 years and older. Please consume responsibly.</p>
      </footer>

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        storeSlug={store.slug}
        storeColor={store.primary_color}
      />
    </div>
  );
}
