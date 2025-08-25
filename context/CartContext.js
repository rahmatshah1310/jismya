"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";

const CART_STORAGE_KEY = "user_cart";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [processingItems, setProcessingItems] = useState({});

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) setCart(JSON.parse(stored));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
  }, [cart]);

  // Add item to cart
  const addToCart = useCallback(
    (product, quantity = 1) => {
      if (processingItems[product._id]) return; // prevent double clicks

      // Set item as processing
      setProcessingItems((prev) => ({ ...prev, [product._id]: true }));

      // Update cart safely
      setCart((prev) => {
        const existingIndex = prev.findIndex((i) => i._id === product._id);
        if (existingIndex > -1) {
          return prev.map((item, index) => (index === existingIndex ? { ...item, quantity: item.quantity + quantity } : item));
        } else {
          return [...prev, { ...product, quantity }];
        }
      });

      // Toast once
      toast.success(`${product.name} added to cart!`);

      // Reset processing state after 200ms
      setTimeout(() => {
        setProcessingItems((prev) => ({ ...prev, [product._id]: false }));
      }, 200);
    },
    [processingItems]
  );

  // Remove item from cart
  const removeFromCart = useCallback(
    (productId) => {
      if (processingItems[productId]) return;

      setProcessingItems((prev) => ({ ...prev, [productId]: true }));
      setCart((prev) => prev.filter((item) => item._id !== productId));
      toast.success("Item removed!");

      setTimeout(() => {
        setProcessingItems((prev) => ({ ...prev, [productId]: false }));
      }, 200);
    },
    [processingItems]
  );

  // Update quantity of a product
  const updateQuantity = useCallback((productId, quantity) => {
    setCart((prev) => prev.map((item) => (item._id === productId ? { ...item, quantity: Math.max(1, quantity) } : item)));
  }, []);

  // Clear the cart
  const clearCart = useCallback(() => {
    setCart([]);
    toast.info("Cart cleared!");
  }, []);

  // Get total price
  const getCartTotal = useCallback(() => cart.reduce((total, item) => total + item.price * item.quantity, 0), [cart]);

  // Get total item count
  const getCartItemCount = useCallback(() => cart.reduce((count, item) => count + item.quantity, 0), [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemCount,
        processingItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook
export function useCart() {
  return useContext(CartContext);
}
