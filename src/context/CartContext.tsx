import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types/index.js';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, size: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  shippingPrice: number;
  freeShippingThreshold: number;
  freeShippingRemaining: number;
  taxPrice: number;
  totalPrice: number;
  isCartDrawerOpen: boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('smartcart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('smartcart_items', JSON.stringify(cart));
    } catch (e) {
      console.warn('Could not save cart to localStorage', e);
    }
  }, [cart]);

  const addToCart = (product: Product, size: string, quantity: number = 1) => {
    setCart(prevCart => {
      const prodId = product.id || product._id || '';
      const existingIndex = prevCart.findIndex(
        item => (item.product.id === prodId || item.product._id === prodId) && item.size === size
      );

      if (existingIndex > -1) {
        const next = [...prevCart];
        next[existingIndex].quantity += quantity;
        return next;
      } else {
        return [...prevCart, { product, size, quantity }];
      }
    });

    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (productId: string, size: string) => {
    setCart(prevCart =>
      prevCart.filter(item => {
        const id = item.product.id || item.product._id;
        return !(id === productId && item.size === size);
      })
    );
  };

  const updateQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item => {
        const id = item.product.id || item.product._id;
        if (id === productId && item.size === size) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cart.reduce((acc, item) => {
    const price = item.product.salePrice || item.product.price;
    return acc + price * item.quantity;
  }, 0);

  const freeShippingThreshold = 100;
  const freeShippingRemaining = Math.max(0, freeShippingThreshold - subtotal);
  const shippingPrice = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 15;
  const taxPrice = Math.round(subtotal * 0.08 * 100) / 100; // 8% sales tax
  const totalPrice = subtotal + shippingPrice + taxPrice;

  const openCartDrawer = () => setIsCartDrawerOpen(true);
  const closeCartDrawer = () => setIsCartDrawerOpen(false);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        shippingPrice,
        freeShippingThreshold,
        freeShippingRemaining,
        taxPrice,
        totalPrice,
        isCartDrawerOpen,
        openCartDrawer,
        closeCartDrawer,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
