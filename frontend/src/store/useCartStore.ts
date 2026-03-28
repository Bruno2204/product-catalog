import { create } from 'zustand';
import type { CartItem, Product } from '../types';

interface CartState {
  // State
  items: CartItem[];
  total: number;
  count: number;

  // Actions
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: number) => boolean;
}
export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  total: 0,
  count: 0,

  addToCart: (product: Product, quantity = 1) => {
    const { items } = get();
    const exists = items.find((item) => item.product.id === product.id);
    const updatedItems = exists
      ? items.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        )
      : [...items, { product, quantity }];
    const total = updatedItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    );
    const count = updatedItems.reduce((acc, item) => acc + item.quantity, 0);

    set({ items: updatedItems, total, count });
  },
  removeFromCart: (productId) => {
    const updated = get().items.filter((i) => i.product.id !== productId);
    const total = updated.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    );
    const count = updated.reduce((acc, item) => acc + item.quantity, 0);
    set({
      items: updated,
      total,
      count,
    });
  },
  updateQuantity: (productId, quantity) => {
    const updated = get().items.map((i) =>
      i.product.id === productId
        ? { ...i, quantity: Math.max(1, quantity) }
        : i,
    );
    const total = updated.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    );
    const count = updated.reduce((acc, item) => acc + item.quantity, 0);
    set({
      items: updated,
      total,
      count,
    });
  },
  clearCart: () => set({ items: [], total: 0, count: 0 }),

  isInCart: (productId) => get().items.some((i) => i.product.id === productId),
}));
