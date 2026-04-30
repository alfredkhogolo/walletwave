import { useState, useEffect } from 'react';

// Simplified local store for the prototype phase
class MarketStore {
  private listeners: Set<() => void> = new Set();
  private cart: any[] = [];
  
  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach(l => l());
  }

  getCart() {
    return this.cart;
  }

  addToCart(product: any) {
    const existing = this.cart.find(p => p.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
    this.notify();
  }

  removeFromCart(id: string) {
    this.cart = this.cart.filter(p => p.id !== id);
    this.notify();
  }

  updateQuantity(id: string, delta: number) {
    const item = this.cart.find(p => p.id === id);
    if (item) {
      item.quantity = Math.max(1, item.quantity + delta);
      this.notify();
    }
  }

  getCartTotal() {
    return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  clearCart() {
    this.cart = [];
    this.notify();
  }
}

export const marketStore = new MarketStore();

export function useCart() {
  const [cart, setCart] = useState(marketStore.getCart());

  useEffect(() => {
    return marketStore.subscribe(() => {
      setCart([...marketStore.getCart()]);
    });
  }, []);

  return {
    cart,
    total: marketStore.getCartTotal(),
    add: (p: any) => marketStore.addToCart(p),
    remove: (id: string) => marketStore.removeFromCart(id),
    updateQuantity: (id: string, d: number) => marketStore.updateQuantity(id, d),
    clear: () => marketStore.clearCart()
  };
}
