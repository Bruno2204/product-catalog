import type { CartItem } from './types'

// ── Local cart helpers ─────────────────────────
// These operate on the cart array from CartContext.
// Keeping them here (not inside components) makes
// them easy to test and easy to replace with real
// API calls later.

export function calcTotal(cart: CartItem[]): number {
  return cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )
}

export function calcCount(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.quantity, 0)
}

export function findItem(
  cart: CartItem[],
  productId: number
): CartItem | undefined {
  return cart.find(item => item.product.id === productId)
}

// ── Placeholder for real API calls later ──────
// Uncomment these when your Express backend is ready:
//
// import api from './axios'
// export const getCart    = () => api.get('/cart').then(r => r.data)
// export const addToCart  = (product_id: number, quantity: number) =>
//   api.post('/cart', { product_id, quantity }).then(r => r.data)
// export const removeFromCart = (id: string) => api.delete(`/cart/${id}`)
// export const checkout   = () => api.post('/orders').then(r => r.data)
