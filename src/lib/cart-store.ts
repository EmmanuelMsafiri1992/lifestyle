import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Cart } from './api';

type CartState = {
  sessionId: string;
  carts: Record<string, Cart>;
  getCartForStore: (slug: string) => Cart | null;
  setCart: (slug: string, cart: Cart) => void;
  clearStoreCart: (slug: string) => void;
};

function generateSessionId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      sessionId: generateSessionId(),
      carts: {},
      getCartForStore: (slug) => get().carts[slug] ?? null,
      setCart: (slug, cart) => set((s) => ({ carts: { ...s.carts, [slug]: cart } })),
      clearStoreCart: (slug) =>
        set((s) => {
          const carts = { ...s.carts };
          delete carts[slug];
          return { carts };
        }),
    }),
    { name: 'lifestyle-cart' }
  )
);
