"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";

const CartContext = createContext(null);

const CART_STORAGE_KEY = "user_cart";
const WISHLIST_STORAGE_KEY = "user_wishlist";

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [processingItems, setProcessingItems] = useState({});

  // Load cart and wishlist from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) setCart(JSON.parse(storedCart));

      const storedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (storedWishlist) setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  // Save cart and wishlist to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    }
  }, [cart, wishlist]);

  // -------------------- Cart Functions --------------------
  const addToCart = useCallback(
    (product, quantity = 1) => {
      if (processingItems[product._id]) return;

      setProcessingItems((prev) => ({ ...prev, [product._id]: true }));

      setCart((prev) => {
        const index = prev.findIndex((item) => item._id === product._id);
        if (index > -1) {
          return prev.map((item, i) => (i === index ? { ...item, quantity: item.quantity + quantity } : item));
        } else {
          return [...prev, { ...product, quantity }];
        }
      });

      toast.success(`${product.name} added to cart!`);

      setTimeout(() => {
        setProcessingItems((prev) => ({ ...prev, [product._id]: false }));
      }, 200);
    },
    [processingItems]
  );

  const removeFromCart = useCallback(
    (productId) => {
      if (processingItems[productId]) return;

      setProcessingItems((prev) => ({ ...prev, [productId]: true }));
      setCart((prev) => prev.filter((item) => item._id !== productId));
      toast.info("Item removed from cart");

      setTimeout(() => {
        setProcessingItems((prev) => ({ ...prev, [productId]: false }));
      }, 200);
    },
    [processingItems]
  );

  const updateQuantity = useCallback((productId, quantity) => {
    setCart((prev) => prev.map((item) => (item._id === productId ? { ...item, quantity: Math.max(1, quantity) } : item)));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    toast.info("Cart cleared!");
  }, []);

  const getCartTotal = useCallback(() => cart.reduce((total, item) => total + item.price * item.quantity, 0), [cart]);
  const getCartItemCount = useCallback(() => cart.reduce((count, item) => count + item.quantity, 0), [cart]);

  // -------------------- Wishlist Functions --------------------
  const addToWishlist = useCallback(
    (product) => {
      if (!wishlist.find((item) => item._id === product._id)) {
        setWishlist((prev) => [...prev, product]);
        const displayName = product.name || product.productName || "Item";
        toast.success(`${displayName} added to wishlist!`);
      } else {
        const displayName = product.name || product.productName || "Item";
        toast.info(`${displayName} is already in wishlist`);
      }
    },
    [wishlist]
  );

  const removeFromWishlist = useCallback((productId) => {
    setWishlist((prev) => prev.filter((item) => item._id !== productId));
    toast.info("Item removed from wishlist");
  }, []);

  const toggleWishlist = useCallback(
    (product) => {
      if (wishlist.find((item) => item._id === product._id)) removeFromWishlist(product._id);
      else addToWishlist(product);
    },
    [wishlist, addToWishlist, removeFromWishlist]
  );

  // -------------------- Provide context --------------------
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
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
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
