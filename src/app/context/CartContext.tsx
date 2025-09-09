"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";

const CartContext = createContext(null);

const CART_STORAGE_KEY = "user_cart";
const WISHLIST_STORAGE_KEY = "user_wishlist";

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      if (typeof window !== "undefined") {
        const storedCart = localStorage.getItem(CART_STORAGE_KEY);
        return storedCart ? JSON.parse(storedCart) : [];
      }
    } catch (_) {}
    return [];
  });
  const [wishlist, setWishlist] = useState(() => {
    try {
      if (typeof window !== "undefined") {
        const storedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
        return storedWishlist ? JSON.parse(storedWishlist) : [];
      }
    } catch (_) {}
    return [];
  });
  const [processingItems, setProcessingItems] = useState({});
  const [isHydrated, setIsHydrated] = useState(false);

  // Mark hydration complete (prevents overwriting storage with initial empty state)
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Save cart and wishlist to localStorage whenever they change (after hydration)
  useEffect(() => {
    if (!isHydrated) return;
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
      }
    } catch (_) {}
  }, [cart, wishlist, isHydrated]);

  // -------------------- Cart Functions --------------------
  const addToCart = useCallback(
    (product, quantity = 1) => {
      if (processingItems[product._id]) return;

      setProcessingItems((prev) => ({ ...prev, [product._id]: true }));

      // If the product exists in wishlist, remove it when adding to cart
      setWishlist((prev) => prev.filter((item) => item._id !== product._id));

      // Calculate the effective price (discounted or original)
      const basePrice = typeof product.price === "number" ? product.price : 0;
      const hasDiscountedPrice = typeof product.discountedPrice === "number" && product.discountedPrice >= 0;
      const hasDiscountPercent = typeof product.discount === "number" && product.discount > 0;

      const effectivePrice = hasDiscountedPrice
        ? product.discountedPrice
        : hasDiscountPercent
        ? Number((basePrice * (1 - product.discount / 100)).toFixed(2))
        : basePrice;

      // Create cart item with calculated price
      const cartItem = {
        ...product,
        price: effectivePrice,
        originalPrice: basePrice,
        quantity
      };

      setCart((prev) => {
        const index = prev.findIndex((item) => item._id === product._id);
        if (index > -1) {
          return prev.map((item, i) => (i === index ? { ...item, quantity: item.quantity + quantity } : item));
        } else {
          return [...prev, cartItem];
        }
      });

      const displayName = product.name || product.productName || "Item";
      toast.success(`${displayName} added to cart!`);

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
  }, []);

  const getCartTotal = useCallback(
    () =>
      cart.reduce((total, item) => {
        const basePrice = typeof item.price === "number" ? item.price : 0;
        const hasDiscountedPrice = typeof item.discountedPrice === "number" && item.discountedPrice >= 0;
        const hasDiscountPercent = typeof item.discount === "number" && item.discount > 0;

        const effectivePrice = hasDiscountedPrice
          ? item.discountedPrice
          : hasDiscountPercent
          ? +(basePrice * (1 - item.discount / 100)).toFixed(2)
          : basePrice;

        return total + effectivePrice * (item.quantity || 1);
      }, 0),
    [cart]
  );
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

  const clearWishlist = useCallback(() => {
    setWishlist([]);
  }, []);

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
        clearWishlist,
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
