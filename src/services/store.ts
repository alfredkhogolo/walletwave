import { useState, useEffect } from 'react';

// Simplified local store for the prototype phase
class MarketStore {
  private listeners: Set<() => void> = new Set();
  private cart: any[] = [];
  private products: any[] = [
    { 
      id: '1', 
      name: 'Fresh Maize (50kg)', 
      price: 12500, 
      vendor: 'Chambo Farms', 
      vendorId: 'v1',
      category: 'farming', 
      image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&q=80&w=800', 
      verified: true, 
      description: 'High-quality freshly harvested maize from Salima. Perfect for local processing or direct sale.', 
      stock: 15, 
      rating: 4.8,
      deliveryPrice: 1500,
      deliveryHours: '2-4 hours',
      telegram: 'chambofarms_mw'
    },
    { 
      id: '2', 
      name: 'Airtel/Mpamba Kiosk', 
      price: 450000, 
      vendor: 'Smart Connect', 
      vendorId: 'v2',
      category: 'electronics', 
      image: 'https://images.unsplash.com/photo-1556742049-dfbd24439199?auto=format&fit=crop&q=80&w=800', 
      verified: true, 
      description: 'Standard size metal kiosk, painted and ready for use. Includes secure locking mechanism.', 
      stock: 2, 
      rating: 5.0,
      deliveryPrice: 5000,
      deliveryHours: '24-48 hours',
      telegram: 'smartconnect_mw'
    },
    { 
      id: '3', 
      name: 'Chitenje Fabric', 
      price: 8500, 
      vendor: 'Blantyre Text', 
      vendorId: 'v3',
      category: 'fashion', 
      image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&q=80&w=800', 
      verified: false, 
      description: 'Beautiful traditional patterns, 6 yards. High quality cotton.', 
      stock: 50, 
      rating: 4.2,
      deliveryPrice: 1000,
      deliveryHours: '1-2 hours',
      telegram: 'bttextiles'
    },
  ];
  private vendors: any[] = [
    { id: 'v1', name: 'Chambo Farms', category: 'Farming', rating: 4.8, reviews: 124, logo: 'CF', verified: true, items: 12, deliveryFee: 1500, deliveryTime: '2-4 Hours', comments: [] },
    { id: 'v2', name: 'Smart Connect', category: 'Electronics', rating: 5.0, reviews: 89, logo: 'SC', verified: true, items: 5, deliveryFee: 5000, deliveryTime: '24-48 Hours', comments: [] },
    { id: 'v3', name: 'Blantyre Text', category: 'Fashion', rating: 4.2, reviews: 45, logo: 'BT', verified: false, items: 50, deliveryFee: 1000, deliveryTime: '1-2 Hours', comments: [] },
  ];
  private messages: any[] = [];
  private user: any = null;
  
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

  getVendors() {
    return this.vendors;
  }

  getUser() {
    return this.user;
  }

  login(userData: any) {
    this.user = userData;
    this.notify();
  }

  logout() {
    this.user = null;
    this.notify();
  }

  getProducts() {
    return this.products;
  }

  addProduct(product: any) {
    this.products.unshift({ 
      ...product, 
      id: `${Date.now()}`, 
      stock: 10, 
      rating: 5.0,
      verified: false
    });
    this.notify();
  }
  addVendor(vendor: any) {
    this.vendors.unshift({ ...vendor, id: `v${Date.now()}`, rating: 5.0, reviews: 0, verified: false, items: 0, comments: [] });
    this.notify();
  }

  addComment(vendorId: string, comment: any) {
    const vendor = this.vendors.find(v => v.id === vendorId);
    if (vendor) {
      if (!vendor.comments) vendor.comments = [];
      vendor.comments.unshift({ ...comment, id: Date.now(), date: new Date().toISOString() });
      this.notify();
    }
  }

  getMessages() {
    return this.messages;
  }

  sendMessage(msg: any) {
    this.messages.unshift({ ...msg, id: Date.now(), timestamp: new Date().toISOString() });
    this.notify();
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

export function useVendors() {
  const [vendors, setVendors] = useState(marketStore.getVendors());

  useEffect(() => {
    return marketStore.subscribe(() => {
      setVendors([...marketStore.getVendors()]);
    });
  }, []);

  return { 
    vendors,
    addVendor: (v: any) => marketStore.addVendor(v),
    addComment: (id: string, c: any) => marketStore.addComment(id, c)
  };
}

export function useProducts() {
  const [products, setProducts] = useState(marketStore.getProducts());

  useEffect(() => {
    return marketStore.subscribe(() => {
      setProducts([...marketStore.getProducts()]);
    });
  }, []);

  return {
    products,
    addProduct: (p: any) => marketStore.addProduct(p)
  };
}

export function useAuth() {
  const [user, setUser] = useState(marketStore.getUser());

  useEffect(() => {
    return marketStore.subscribe(() => {
      setUser(marketStore.getUser());
    });
  }, []);

  return {
    user,
    login: (u: any) => marketStore.login(u),
    logout: () => marketStore.logout(),
    isLoggedIn: !!user
  };
}

export function useMessages() {
  const [messages, setMessages] = useState(marketStore.getMessages());

  useEffect(() => {
    return marketStore.subscribe(() => {
      setMessages([...marketStore.getMessages()]);
    });
  }, []);

  return {
    messages,
    sendMessage: (msg: any) => marketStore.sendMessage(msg)
  };
}
