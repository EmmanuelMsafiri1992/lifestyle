'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShoppingCart, Search, User, ChevronDown, ChevronRight,
  Leaf, Phone, Mail, MapPin, Package, Lock, Truck,
  Zap, Moon, Brain, Heart, Shield, Activity, Smile, Flame,
  ArrowRight, Star, CheckCircle, MessageSquare, Menu, X,
} from 'lucide-react';
import { getStores, type Store } from '@/lib/api';

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   ANNOUNCEMENT BAR
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function AnnouncementBar() {
  return (
    <div className="bg-[#1a3009] text-white text-center text-xs py-2.5 px-4 font-semibold tracking-wide">
      <span className="flex items-center justify-center gap-4 flex-wrap">
        <span className="flex items-center gap-1.5"><Shield size={11} /> Strictly 18+ Only</span>
        <span className="hidden sm:inline text-white/40">|</span>
        <span className="flex items-center gap-1.5"><Package size={11} /> Discreet Packaging on Every Order</span>
        <span className="hidden sm:inline text-white/40">|</span>
        <span className="flex items-center gap-1.5"><Lock size={11} /> Secure Checkout via PayFast</span>
      </span>
    </div>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   NAVBAR
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen]     = useState(false);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg,#2d5016,#4a7c2f)' }}>
            <Leaf size={18} className="text-white" />
          </div>
          <div className="leading-none">
            <p className="font-black text-[#1a3009] text-lg tracking-tight">LifeStyle</p>
            <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest">Boutique</p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
          <div className="relative group"
            onMouseEnter={() => setShopOpen(true)}
            onMouseLeave={() => setShopOpen(false)}>
            <button className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:text-[#2d5016] hover:bg-green-50 transition-colors">
              Shop <ChevronDown size={14} />
            </button>
            {shopOpen && (
              <div className="absolute top-full left-0 bg-white border border-gray-100 shadow-xl rounded-2xl py-2 w-60 z-50">
                <Link href="/store/cannabis-cabinet"
                  className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-green-50 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Leaf size={14} className="text-[#2d5016]" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Cannabis Cabinet</p>
                    <p className="text-xs text-gray-400">Flower, Edibles, Oils</p>
                  </div>
                </Link>
                <Link href="/store/adults-only"
                  className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-rose-50 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center flex-shrink-0">
                    <Heart size={14} className="text-rose-700" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Pleasure Paradise</p>
                    <p className="text-xs text-gray-400">Toys &amp; Lingerie</p>
                  </div>
                </Link>
              </div>
            )}
          </div>
          <a href="#benefits" className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:text-[#2d5016] hover:bg-green-50 transition-colors">Benefits</a>
          <a href="#about"    className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:text-[#2d5016] hover:bg-green-50 transition-colors">About</a>
          <a href="#contact"  className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:text-[#2d5016] hover:bg-green-50 transition-colors">Contact</a>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2 ml-auto md:ml-0">
          <button className="hidden md:flex w-9 h-9 items-center justify-center rounded-lg text-gray-500 hover:text-[#2d5016] hover:bg-green-50 transition-colors">
            <Search size={17} />
          </button>
          <button className="hidden md:flex w-9 h-9 items-center justify-center rounded-lg text-gray-500 hover:text-[#2d5016] hover:bg-green-50 transition-colors">
            <User size={17} />
          </button>
          <Link href="/store/cannabis-cabinet"
            className="flex items-center gap-2 px-3 py-2 rounded-xl border-2 border-[#2d5016] text-[#2d5016] text-sm font-bold hover:bg-[#2d5016] hover:text-white transition-all">
            <ShoppingCart size={16} />
            <span className="hidden sm:inline">Cart</span>
          </Link>
          <button onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-gray-700">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1">
          <Link href="/store/cannabis-cabinet" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-700 hover:bg-green-50">
            <Leaf size={15} className="text-[#2d5016]" /> Cannabis Cabinet
          </Link>
          <Link href="/store/adults-only" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-700 hover:bg-rose-50">
            <Heart size={15} className="text-rose-600" /> Pleasure Paradise
          </Link>
          <a href="#benefits" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50">
            <Activity size={15} className="text-gray-400" /> Benefits
          </a>
          <a href="#contact" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50">
            <Phone size={15} className="text-gray-400" /> Contact
          </a>
        </div>
      )}
    </header>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   HERO
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[540px] flex items-center">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-cannabis.jpg"
          alt="Premium cannabis products"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        {/* Dark gradient overlay so text is legible */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e1f05]/90 via-[#1a3009]/75 to-[#1a3009]/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 md:py-28 w-full">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.05] mb-5">
            Healing Your World<br />
            <span className="text-[#9dc153]">â€” One Plant</span><br />
            at a Time.
          </h1>
          <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-md">
            South Africa&apos;s premier adult lifestyle boutique. Premium
            cannabis products and a discreet adult range â€” all delivered
            with complete privacy.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/store/cannabis-cabinet"
              className="inline-flex items-center gap-2 bg-[#9dc153] hover:bg-[#8ab43e] text-[#1a3009] px-7 py-3.5 rounded-xl font-black text-sm transition-all hover:scale-105 shadow-lg">
              <Leaf size={16} /> View Cannabis Range
            </Link>
            <Link href="/store/adults-only"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white px-7 py-3.5 rounded-xl font-black text-sm transition-all">
              <Heart size={16} /> Adults Store
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   FEATURED STRAINS â€” real product artwork
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const strains = [
  { img: '/images/strain-hifi.jpg',        name: 'Hifi GD',      type: 'Hybrid',  thc: '24%', price: 'R70/g',  bg: '#0d1f05' },
  { img: '/images/strain-mimosa.jpg',      name: 'Mimosa 3A',    type: 'Indica',  thc: '22%', price: 'R90/g',  bg: '#1a0d2e' },
  { img: '/images/strain-white-widow.jpg', name: 'White Widow',  type: 'Hybrid',  thc: '19%', price: 'R50/g',  bg: '#0a1a2a' },
];

function FeaturedStrains() {
  return (
    <section className="py-14 px-4 bg-gray-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-black tracking-widest uppercase text-[#4a7c2f] mb-1">Just Added</p>
            <h2 className="text-2xl font-black text-gray-900">Premium Flower Strains</h2>
          </div>
          <Link href="/store/cannabis-cabinet"
            className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-[#2d5016] hover:underline">
            View all <ChevronRight size={15} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {strains.map((s) => (
            <Link key={s.name} href="/store/cannabis-cabinet"
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
              {/* Product image */}
              <div className="relative h-52 overflow-hidden" style={{ background: s.bg }}>
                <Image
                  src={s.img}
                  alt={s.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-[#2d5016] text-white text-xs font-black px-2.5 py-1 rounded-full">{s.type}</span>
                </div>
              </div>
              {/* Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-black text-gray-900">{s.name}</h3>
                  <span className="text-xs font-bold text-[#4a7c2f] bg-green-50 px-2 py-0.5 rounded-full">THC {s.thc}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xl font-black text-gray-900">{s.price}</p>
                  <button className="flex items-center gap-1.5 bg-[#2d5016] hover:bg-[#3d6b1f] text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors">
                    <ShoppingCart size={12} /> Add to basket
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   SHOP BY DIVISION
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function ShopByDivision({ stores }: { stores: Store[] }) {
  const cfg: Record<string, { icon: React.ReactNode; imgSrc: string; categories: string[]; tag: string }> = {
    'cannabis-cabinet': {
      icon: <Leaf size={24} className="text-[#2d5016]" />,
      imgSrc: '/images/hero-cannabis.jpg',
      categories: ['Flower', 'Edibles', 'Gummies', 'Pre-Rolls', 'Oils & Tinctures'],
      tag: 'Division A',
    },
    'adults-only': {
      icon: <Heart size={24} className="text-rose-700" />,
      imgSrc: '',
      categories: ['Vibrators', 'Lingerie', 'Couples', 'Accessories'],
      tag: 'Division B',
    },
  };

  if (!stores.length) return null;

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-black tracking-widest uppercase text-[#4a7c2f] mb-2">Our Stores</p>
          <h2 className="text-4xl font-black text-gray-900">Shop Our Collections</h2>
          <p className="text-gray-500 mt-2 max-w-lg mx-auto text-sm">
            Both stores require age verification â€” strictly 18 years and older.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {stores.map((store) => {
            const c = cfg[store.slug];
            if (!c) return null;
            const isCannabis = store.slug === 'cannabis-cabinet';
            return (
              <Link key={store.slug} href={`/store/${store.slug}`}
                className="group relative rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 min-h-[340px] flex flex-col">

                {/* Background: real photo for cannabis, gradient for adults */}
                <div className="absolute inset-0">
                  {isCannabis && c.imgSrc ? (
                    <>
                      <Image src={c.imgSrc} alt={store.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-center" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0e1f05]/95 via-[#0e1f05]/60 to-transparent" />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#3d0020] via-[#5c0030] to-[#1a0010]" />
                  )}
                </div>

                {/* Content */}
                <div className="relative z-10 p-8 flex flex-col h-full justify-end">
                  {/* Top badge */}
                  <div className="absolute top-5 right-5">
                    <span className="text-xs font-black px-3 py-1 rounded-full bg-white/15 border border-white/30 text-white">
                      18+
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center mb-4">
                    {isCannabis
                      ? <Leaf size={22} className="text-[#9dc153]" />
                      : <Heart size={22} className="text-rose-300" />}
                  </div>

                  <span className="text-xs font-black tracking-widest uppercase text-white/50 mb-1">{c.tag}</span>
                  <h3 className="text-2xl font-black text-white mb-1">{store.name}</h3>
                  <p className="text-sm text-white/60 mb-4 leading-relaxed line-clamp-2">{store.description}</p>

                  {/* Category pills */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {c.categories.map((cat) => (
                      <span key={cat} className="text-xs px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 font-medium">
                        {cat}
                      </span>
                    ))}
                  </div>

                  <div className="inline-flex items-center gap-2 text-sm font-black text-white group-hover:gap-3 transition-all">
                    Enter Store <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   EDIBLES & GUMMIES VISUAL ROW
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function ProductHighlights() {
  const items = [
    {
      img: '/images/edibles-brownies.jpg',
      title: 'Cannabis Brownies',
      sub: 'Rich chocolate brownies infused with premium cannabis oil. Lab-tested dosage.',
      tag: 'Edibles',
      price: 'R90 / 2 pack',
    },
    {
      img: '/images/product-gummies.jpg',
      title: 'Mixed Berry Gummies',
      sub: 'Precisely dosed sweet gummies â€” 5mg THC each, available in mixed berry & tropical.',
      tag: 'Gummies',
      price: 'R75 / 10 pack',
    },
  ];

  return (
    <section className="py-14 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-black tracking-widest uppercase text-[#4a7c2f] mb-1">Popular Products</p>
            <h2 className="text-2xl font-black text-gray-900">Edibles &amp; Gummies</h2>
          </div>
          <Link href="/store/cannabis-cabinet"
            className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-[#2d5016] hover:underline">
            Shop all <ChevronRight size={15} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {items.map((item) => (
            <Link key={item.title} href="/store/cannabis-cabinet"
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex flex-col">
              <div className="relative h-56 overflow-hidden bg-gray-100">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-[#2d5016] text-white text-xs font-black px-2.5 py-1 rounded-full">{item.tag}</span>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-black text-gray-900 text-lg mb-1">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">{item.sub}</p>
                <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                  <p className="text-xl font-black text-gray-900">{item.price}</p>
                  <button className="flex items-center gap-2 bg-[#2d5016] hover:bg-[#3d6b1f] text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors">
                    <ShoppingCart size={14} /> Add to basket
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   CANNABIS BENEFITS
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const benefits = [
  { Icon: Zap,          label: 'Pain Relief',       color: '#ef4444', bg: '#fee2e2' },
  { Icon: Activity,     label: 'Bone Health',        color: '#f97316', bg: '#ffedd5' },
  { Icon: Moon,         label: 'Better Sleep',       color: '#6366f1', bg: '#ede9fe' },
  { Icon: Shield,       label: 'Anti-Addiction',     color: '#0ea5e9', bg: '#e0f2fe' },
  { Icon: Heart,        label: 'Heart Health',       color: '#ec4899', bg: '#fce7f3' },
  { Icon: Brain,        label: 'Brain Health',       color: '#8b5cf6', bg: '#f5f3ff' },
  { Icon: Smile,        label: 'Mood Boost',         color: '#f59e0b', bg: '#fef3c7' },
  { Icon: Flame,        label: 'Natural Wellness',   color: '#22c55e', bg: '#dcfce7' },
];

function Benefits() {
  return (
    <section id="benefits" className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-black tracking-widest uppercase text-[#4a7c2f] mb-2">Why Cannabis?</p>
          <h2 className="text-4xl font-black text-gray-900">Potential Health Benefits</h2>
          <p className="text-gray-500 mt-2 max-w-lg mx-auto text-sm">
            Research continues to explore the wide range of therapeutic benefits cannabis may offer.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {benefits.map(({ Icon, label, color, bg }) => (
            <div key={label} className="bg-gray-50 rounded-2xl p-5 text-center border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                style={{ background: bg }}>
                <Icon size={22} style={{ color }} />
              </div>
              <p className="font-bold text-gray-800 text-sm">{label}</p>
            </div>
          ))}
        </div>

        {/* CTA banner */}
        <div className="bg-[#2d5016] rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-black text-white mb-2">Explore Our Full Cannabis Range</h3>
            <p className="text-white/70 leading-relaxed max-w-xl">
              From CBD oils and tinctures to edibles, premium flower and pre-rolls â€”
              every product is lab-tested and responsibly sourced.
            </p>
          </div>
          <Link href="/store/cannabis-cabinet"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-[#9dc153] hover:bg-[#8ab43e] text-[#1a3009] px-7 py-3.5 rounded-xl font-black text-sm transition-all hover:scale-105 shadow-lg">
            <Leaf size={16} /> Shop Cannabis Products
          </Link>
        </div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   TRUST STATS
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function TrustStrip() {
  const stats = [
    { n: '18+', label: 'Age Verified', Icon: Shield },
    { n: '100%', label: 'Discreet Packaging', Icon: Package },
    { n: '5â˜…', label: 'Customer Rated', Icon: Star },
    { n: '24h', label: 'Cape Town Delivery', Icon: Truck },
  ];
  return (
    <section className="bg-[#1a3009] py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map(({ n, label, Icon }) => (
          <div key={label} className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Icon size={14} className="text-[#9dc153]" />
              <p className="text-3xl font-black text-[#9dc153]">{n}</p>
            </div>
            <p className="text-white/60 text-sm font-semibold">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   ADULTS PROMO
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function AdultPromo() {
  const features = [
    { Icon: Package,        label: 'Plain Packaging' },
    { Icon: Lock,           label: 'Private Checkout' },
    { Icon: Star,           label: 'Premium Brands' },
    { Icon: Truck,          label: 'Fast Delivery' },
  ];
  const categories = ['Luxury Vibrators', 'Lace Lingerie', 'Couples Kits', 'Accessories'];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-[#3d0020] to-[#1a0010] rounded-3xl overflow-hidden">
          <div className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <p className="text-xs font-black tracking-widest uppercase text-rose-400 mb-3">Division B â€” Pleasure Paradise</p>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                Premium Adult<br />Lifestyle Boutique
              </h2>
              <p className="text-white/60 leading-relaxed mb-6 max-w-md text-sm">
                A curated selection of luxury adult toys and lingerie â€” top brands,
                plain packaging, and complete discretion on every single order.
              </p>
              <div className="flex flex-wrap gap-2 mb-7">
                {categories.map((cat) => (
                  <span key={cat} className="text-xs px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/70 font-medium">
                    {cat}
                  </span>
                ))}
              </div>
              <Link href="/store/adults-only"
                className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-7 py-3.5 rounded-xl font-black text-sm transition-all hover:scale-105 shadow-lg">
                <Heart size={16} /> Enter Pleasure Paradise
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 flex-shrink-0">
              {features.map(({ Icon, label }) => (
                <div key={label} className="bg-white/10 border border-white/15 rounded-2xl p-5 text-center">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center mx-auto mb-2">
                    <Icon size={18} className="text-rose-300" />
                  </div>
                  <p className="text-xs font-bold text-white/80">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   ABOUT
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function About() {
  const pillars = [
    { Icon: Leaf,          color: '#22c55e', bg: '#dcfce7', title: 'Responsibly Sourced',  text: 'Every cannabis product is independently lab-tested and sourced from ethical, trusted South African producers.' },
    { Icon: Lock,          color: '#6366f1', bg: '#ede9fe', title: 'Total Privacy',         text: 'Plain packaging, discreet billing descriptors, and a checkout process designed for complete confidentiality.' },
    { Icon: MessageSquare, color: '#0ea5e9', bg: '#e0f2fe', title: 'Expert Support',        text: 'Our team is available via WhatsApp or phone â€” professional, confidential, and always helpful.' },
  ];
  return (
    <section id="about" className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-xs font-black tracking-widest uppercase text-[#4a7c2f] mb-2">Who We Are</p>
        <h2 className="text-4xl font-black text-gray-900 mb-4">Your Trusted Adult Lifestyle Boutique</h2>
        <p className="text-gray-500 leading-relaxed text-base max-w-3xl mx-auto mb-10">
          LifeStyle Boutique is South Africa&apos;s premier destination for premium cannabis products and a
          discreet adult lifestyle range. Quality, privacy, and responsible retail â€” every product
          is curated with care and shipped with complete discretion.
        </p>
        <div className="grid sm:grid-cols-3 gap-5 text-left">
          {pillars.map(({ Icon, color, bg, title, text }) => (
            <div key={title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: bg }}>
                <Icon size={20} style={{ color }} />
              </div>
              <h3 className="font-black text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   CONTACT
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function Contact() {
  const cards = [
    { href: 'tel:0842054133',                       Icon: Phone,          iconColor: '#2d5016', bg: '#dcfce7', label: 'Phone',    value: '084 205 4133' },
    { href: 'https://wa.me/27842054133',            Icon: MessageSquare,  iconColor: '#16a34a', bg: '#dcfce7', label: 'WhatsApp', value: 'Chat with us' },
    { href: 'mailto:info@lifestyleboutique.co.za',  Icon: Mail,           iconColor: '#2d5016', bg: '#dcfce7', label: 'Email',    value: 'info@lifestyleboutique.co.za' },
  ];
  return (
    <section id="contact" className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-black tracking-widest uppercase text-[#4a7c2f] mb-2">Get In Touch</p>
          <h2 className="text-4xl font-black text-gray-900">Contact Us</h2>
          <p className="text-gray-500 mt-2 text-sm">All enquiries handled with complete confidentiality.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5 max-w-3xl mx-auto">
          {cards.map(({ href, Icon, iconColor, bg, label, value }) => (
            <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-gray-100 hover:shadow-md hover:border-[#9dc153] transition-all group">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform" style={{ background: bg }}>
                <Icon size={20} style={{ color: iconColor }} />
              </div>
              <p className="font-black text-gray-900">{label}</p>
              <p className="text-[#2d5016] font-semibold text-sm mt-1 break-all">{value}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   FOOTER
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function Footer() {
  return (
    <footer className="bg-[#0e1f05] text-gray-400">
      <div className="max-w-7xl mx-auto px-4 py-14 grid md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#9dc153]">
              <Leaf size={16} className="text-[#0e1f05]" />
            </div>
            <div>
              <p className="font-black text-white">LifeStyle Boutique</p>
              <p className="text-[10px] text-gray-600 uppercase tracking-widest">Premium Adult Retail</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-gray-500">
            South Africa&apos;s premier destination for premium cannabis and adult lifestyle products. Strictly 18+.
          </p>
          {/* Social â€” SVG icons, no emojis */}
          <div className="flex items-center gap-2.5 mt-5">
            <a href="#" aria-label="Facebook"
              className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:bg-[#9dc153] hover:text-[#0e1f05] hover:border-transparent transition-all">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram"
              className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:bg-[#9dc153] hover:text-[#0e1f05] hover:border-transparent transition-all">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a href="#" aria-label="TikTok"
              className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:bg-[#9dc153] hover:text-[#0e1f05] hover:border-transparent transition-all">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Cannabis store */}
        <div>
          <p className="text-xs font-black tracking-widest uppercase text-[#9dc153] mb-4">Cannabis Cabinet</p>
          <ul className="space-y-2 text-sm">
            {['Flower', 'Edibles', 'Gummies', 'Pre-Rolls', 'Oils & Tinctures'].map((cat) => (
              <li key={cat}>
                <Link href="/store/cannabis-cabinet" className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <CheckCircle size={11} className="text-[#9dc153] flex-shrink-0" /> {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Adults store */}
        <div>
          <p className="text-xs font-black tracking-widest uppercase text-rose-500 mb-4">Pleasure Paradise</p>
          <ul className="space-y-2 text-sm">
            {['Vibrators', 'Lingerie', 'Couples', 'Accessories'].map((cat) => (
              <li key={cat}>
                <Link href="/store/adults-only" className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <CheckCircle size={11} className="text-rose-500 flex-shrink-0" /> {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-xs font-black tracking-widest uppercase text-[#9dc153] mb-4">Information</p>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin size={14} className="text-[#9dc153] flex-shrink-0 mt-0.5" />
              <span>South Africa</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={14} className="text-[#9dc153] flex-shrink-0" />
              <a href="tel:0842054133" className="hover:text-white transition-colors">084 205 4133</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={14} className="text-[#9dc153] flex-shrink-0" />
              <a href="mailto:info@lifestyleboutique.co.za" className="hover:text-white transition-colors break-all">info@lifestyleboutique.co.za</a>
            </li>
          </ul>
          <div className="mt-5">
            <p className="text-xs text-gray-600 mb-2 font-semibold">Accepted Payments</p>
            <div className="flex gap-2 flex-wrap">
              {['VISA', 'Mastercard', 'EFT', 'Cash'].map((p) => (
                <span key={p} className="text-xs px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 font-bold text-gray-400">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 py-5 px-4 text-center text-xs text-gray-600">
        <p>Â© {new Date().getFullYear()} LifeStyle Boutique. All rights reserved.</p>
        <p className="mt-1">Cannabis and adult products are strictly for persons 18 years of age and older. Please consume responsibly.</p>
      </div>
    </footer>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   PAGE ROOT
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export default function HomePage() {
  const [stores, setStores] = useState<Store[]>([]);

  useEffect(() => {
    getStores().then(setStores).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Navbar />
      <Hero />
      <FeaturedStrains />
      <ShopByDivision stores={stores} />
      <ProductHighlights />
      <Benefits />
      <TrustStrip />
      <AdultPromo />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

