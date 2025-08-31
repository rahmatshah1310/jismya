"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HiOutlineMenu, HiOutlineHeart, HiOutlineShoppingCart, HiOutlinePhone, HiX, HiOutlineChevronDown } from "react-icons/hi";
import { useGetAllCategories } from "@/app/api/productApi";
import { useCart } from "@/context/CartContext";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import SearchBar from "@/components/ui/SearchBar";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

function CategoriesButton({ categories, isMobile = false, onClose }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button
          variant="outline"
          className={`flex items-center gap-2 px-3 py-2 border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 rounded-lg font-medium text-sm ${
            isMobile ? "w-full justify-between" : ""
          }`}
        >
          <HiOutlineMenu className="w-4 h-4" />
          <span className={isMobile ? "block" : "hidden sm:inline"}>Categories</span>
          <HiOutlineChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content sideOffset={8} className="w-64 bg-white border border-gray-200 rounded-xl shadow-xl p-2 animate-in fade-in-0 zoom-in-95">
        <DropdownMenu.Item asChild>
          <Link
            href="/category"
            className="block px-4 py-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 font-medium border-b border-gray-100 mb-2 transition-colors"
            onClick={isMobile && onClose ? onClose : undefined}
          >
            View All Categories
          </Link>
        </DropdownMenu.Item>

        {categories.slice(0, 8).map((category) => (
          <DropdownMenu.Item key={category._id} asChild>
            <Link
              href={`/category/${category._id}`}
              className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
              onClick={isMobile && onClose ? onClose : undefined}
            >
              <span className="font-medium">{category.name}</span>
              <span className="text-xs text-gray-400">→</span>
            </Link>
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { getCartItemCount, wishlist } = useCart();
  const cartItemCount = getCartItemCount();
  const wishlistCount = wishlist?.length || 0;
  const { data: categoriesResponse } = useGetAllCategories();
  const categories = categoriesResponse?.data || [];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-10 transition-all duration-300 ${isScrolled ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-sm"}`}>
      {/* Top Bar */}
      {/* Top Bar - hidden on mobile */}
      <div className="hidden lg:block bg-blue-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-sm">
            {/* Left side: Free shipping + phone */}
            <div className="flex items-center gap-4">
              <span className="font-medium">Free shipping on orders over $50!</span>
              <div className="flex items-center gap-2">
                <HiOutlinePhone className="w-4 h-4" />
                <span>(021) 111-624-333</span>
              </div>
            </div>

            {/* Right side: Links */}
            <div className="flex items-center gap-6">
              <Link href="/" className="hover:text-blue-200 transition-colors" onClick={closeMobileMenu}>
                Home
              </Link>
              <Link href="/contact" className="hover:text-blue-200 transition-colors">
                Contact
              </Link>
              <Link href="/track-order" className="hover:text-blue-200 transition-colors">
                Track Order
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-2 sm:py-4 ">
          <div className="flex items-center justify-between gap-x-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center gap-2 group">
                <Image src="/cart.png" alt="logo" width={50} height={50} />
              </Link>
            </div>

            {/* Categories - Desktop Only */}
            <div className="hidden lg:block">
              <CategoriesButton categories={categories} />
            </div>

            {/* Search - Desktop */}
            <div className="hidden lg:block flex-1 max-w-2xl mx-8">
              <SearchBar />
            </div>

            {/* Actions - Desktop */}
            <div className="hidden lg:flex items-center gap-6">
              <Link href="/wishlist" className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors group relative">
                <HiOutlineHeart className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium">Wishlist</span>
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link href="/cart" className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors group relative">
                <HiOutlineShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium">Cart</span>
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="lg:hidden flex items-center gap-3">
              <Link href="/wishlist" className="text-gray-600 relative hover:text-blue-600 transition-colors">
                <HiOutlineHeart className="w-6 h-6" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link href="/cart" className="text-gray-600 relative hover:text-blue-600 transition-colors">
                <HiOutlineShoppingCart className="w-6 h-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
              >
                <HiOutlineMenu className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Search - Mobile */}
          <div className="lg:hidden mt-2">
            <SearchBar />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="p-6 bg-white absolute top-0 w-full shadow-lg rounded"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Menu</h3>
              <button onClick={closeMobileMenu} className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Close mobile menu">
                <HiX className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4  overflow-y-auto">
              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-medium mb-3 text-gray-900">Categories</h4>
                <div className="w-full">
                  <CategoriesButton categories={categories} isMobile={true} onClose={closeMobileMenu} />
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-medium mb-3 text-gray-900">Quick Links</h4>
                <div className="space-y-2">
                  <Link href="/" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-700" onClick={closeMobileMenu}>
                    Home
                  </Link>
                  <Link href="/contact" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-700" onClick={closeMobileMenu}>
                    Contact
                  </Link>
                  <Link href="/track-order" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-700" onClick={closeMobileMenu}>
                    Track Order
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
