"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ThemeToggle } from "../ui/theme-toggle";
import { HiOutlineMenu, HiOutlineSearch, HiOutlineUser, HiOutlineHeart, HiOutlineShoppingCart, HiOutlinePhone, HiX } from "react-icons/hi";
import { useGetAllCategories } from "../../app/api/productApi";
import { useCart } from "../../context/CartContext";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

function SearchBar() {
  return (
    <div className="relative">
      <Input
        placeholder="Search products..."
        className="w-full pl-4 pr-12 py-3 rounded-xl border-0 bg-sand/60 dark:bg-white/10 focus:ring-2 focus:ring-brand/30 focus:border-transparent transition-all duration-200"
      />
      <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-ink/60 dark:text-d-ink/60 hover:text-brand dark:hover:text-brand transition-colors">
        <HiOutlineSearch className="w-5 h-5" />
      </button>
    </div>
  );
}

function CategoriesButton({ categories }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline" className="w-full border-border dark:border-d-border text-ink dark:text-d-ink hover:bg-sand/60 dark:hover:bg-white/10 hover:text-ink dark:hover:text-d-ink transition-all duration-200">
          <HiOutlineMenu className="w-5 h-5 mr-2" />
          CATEGORIES
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content sideOffset={8} className="w-64 bg-white dark:bg-d-card border border-border dark:border-d-border rounded-2xl shadow-hover p-2 animate-scale-in">
        <DropdownMenu.Item asChild>
          <Link
            href="/category"
            className="block px-3 py-2 rounded-xl hover:bg-sand/40 dark:hover:bg-white/10 text-ink dark:text-d-ink hover:text-ink dark:hover:text-d-ink font-medium border-b border-border/50 dark:border-d-border/50 mb-2 transition-colors duration-200"
          >
            View All Categories
          </Link>
        </DropdownMenu.Item>

        {categories.slice(0, 8).map((category) => (
          <DropdownMenu.Item key={category._id} asChild>
            <Link
              href={`/category/${category._id}`}
              className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-sand/40 dark:hover:bg-white/10 text-ink dark:text-d-ink hover:text-ink dark:hover:text-d-ink transition-colors duration-200"
            >
              <span className="font-medium">{category.name}</span>
              <span className="text-xs text-ink/50 dark:text-d-ink/50">→</span>
            </Link>
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export function Header() {
  const [isTopBannerVisible, setIsTopBannerVisible] = useState(true);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { getCartItemCount } = useCart();
  const cartItemCount = getCartItemCount();
  const { data: categoriesResponse } = useGetAllCategories();
  const categories = categoriesResponse?.data || [];

  useEffect(() => {
    // Reserved for future header-related side effects
  }, []);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsCategoriesOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-cream/60 dark:bg-d-bg/60 backdrop-blur supports-[backdrop-filter]:bg-cream/60 dark:supports-[backdrop-filter]:bg-d-bg/60 shadow-soft">
      {/* Main Navigation */}
      <div className="bg-white dark:bg-d-card border-b border-border dark:border-d-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Single responsive layout */}
          <div className="grid grid-cols-12 items-center gap-4">
            {/* Logo */}
            <div className="col-span-6 sm:col-span-4 md:col-span-2">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-8 md:w-10 h-8 md:h-10 bg-brand rounded-2xl flex items-center justify-center group-hover:bg-brand-600 transition-colors duration-200">
                  <span className="text-white font-bold text-lg md:text-xl">U</span>
                </div>
                <span className="text-ink dark:text-d-ink text-xl md:text-2xl font-serif font-bold group-hover:text-brand dark:group-hover:text-brand transition-colors duration-200">user</span>
              </Link>
            </div>

            {/* Categories (desktop/tablet only) */}
            <div className="hidden md:block md:col-span-2">
              <CategoriesButton categories={categories} />
            </div>

            {/* Search (single instance; full-width on mobile) */}
            <div className="order-3 md:order-none col-span-12 md:col-span-6">
              <SearchBar />
            </div>

            {/* Actions - Desktop/Tablet */}
            <div className="hidden md:flex md:col-span-2 items-center justify-end gap-4">
              <ThemeToggle />
              
              <button className="flex flex-col items-center text-ink dark:text-d-ink hover:text-brand dark:hover:text-brand transition-colors duration-200 group">
                <HiOutlineUser className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-xs">Hello, Sign In</span>
              </button>

              <button className="flex flex-col items-center text-ink dark:text-d-ink hover:text-brand dark:hover:text-brand transition-colors duration-200 group">
                <HiOutlineHeart className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-xs">0 item</span>
              </button>

              <Link href="/cart" className="flex flex-col items-center text-ink dark:text-d-ink hover:text-brand dark:hover:text-brand transition-colors duration-200 group relative">
                <HiOutlineShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-xs">Cart</span>
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-scale-in">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Actions - Mobile (cart + menu) */}
            <div className="col-span-6 sm:col-span-8 md:hidden flex items-center justify-end gap-3">
              <Link href="/cart" className="text-ink dark:text-d-ink relative hover:text-brand dark:hover:text-brand transition-colors duration-200">
                <HiOutlineShoppingCart className="w-6 h-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-scale-in">
                    {cartItemCount}
                  </span>
                )}
              </Link>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-ink dark:text-d-ink hover:text-brand dark:hover:text-brand transition-colors duration-200">
                <HiOutlineMenu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-50 animate-fade-in" onClick={closeMobileMenu}>
          <div className="absolute top-0 right-0 h-full w-80 bg-white dark:bg-d-card shadow-hover animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-serif font-semibold text-ink dark:text-d-ink">Menu</h3>
                <button onClick={closeMobileMenu} className="text-ink/60 dark:text-d-ink/60 hover:text-ink dark:hover:text-d-ink transition-colors duration-200">
                  <HiX className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <button className="flex items-center gap-3 w-full text-left p-3 rounded-xl hover:bg-sand/40 dark:hover:bg-white/10 transition-colors duration-200 text-ink dark:text-d-ink">
                  <HiOutlineUser className="w-5 h-5" />
                  <span>Hello, Sign In</span>
                </button>

                <button className="flex items-center gap-3 w-full text-left p-3 rounded-xl hover:bg-sand/40 dark:hover:bg-white/10 transition-colors duration-200 text-ink dark:text-d-ink">
                  <HiOutlineHeart className="w-5 h-5" />
                  <span>Wishlist (0 items)</span>
                </button>

                {/* Reuse same categories component inside the drawer */}
                <CategoriesButton categories={categories} />

                <div className="border-t border-border dark:border-d-border pt-4">
                  <h4 className="font-medium mb-3 text-ink dark:text-d-ink">Quick Links</h4>
                  <div className="space-y-2">
                    <Link href="/" className="block p-2 rounded-xl hover:bg-sand/40 dark:hover:bg-white/10 transition-colors duration-200 text-ink dark:text-d-ink">
                      Home
                    </Link>
                    <Link href="/contact" className="block p-2 rounded-xl hover:bg-sand/40 dark:hover:bg-white/10 transition-colors duration-200 text-ink dark:text-d-ink">
                      Contact
                    </Link>
                    <Link href="/about" className="block p-2 rounded-xl hover:bg-sand/40 dark:hover:bg-white/10 transition-colors duration-200 text-ink dark:text-d-ink">
                      About Us
                    </Link>
                    <Link href="/track-order" className="block p-2 rounded-xl hover:bg-sand/40 dark:hover:bg-white/10 transition-colors duration-200 text-ink dark:text-d-ink">
                      Track Order
                    </Link>
                    <Link href="/my-orders" className="block p-2 rounded-xl hover:bg-sand/40 dark:hover:bg-white/10 transition-colors duration-200 text-ink dark:text-d-ink">
                      My Orders
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Secondary Navigation (visible on md and up; no scroll behavior) */}
      <div className="hidden md:block bg-sand/40 dark:bg-white/5 border-b border-border dark:border-d-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="hidden md:flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-ink dark:text-d-ink font-medium">Welcome To user.Pk!</span>
              <div className="flex items-center gap-2 text-ink/70 dark:text-d-ink/70">
                <HiOutlinePhone className="w-4 h-4" />
                <span className="text-sm">(021) 111-624-333</span>
              </div>
            </div>

            <nav className="flex items-center gap-6 text-sm text-ink/70 dark:text-d-ink/70">
              <Link href="/" className="hover:text-brand dark:hover:text-brand transition-colors duration-200">
                Home
              </Link>
              <Link href="/contact" className="hover:text-brand dark:hover:text-brand transition-colors duration-200">
                Contact
              </Link>
              <Link href="/about" className="hover:text-brand dark:hover:text-brand transition-colors duration-200">
                About Us
              </Link>
              <Link href="/track-order" className="hover:text-brand dark:hover:text-brand transition-colors duration-200">
                Track Order
              </Link>
              <Link href="/my-orders" className="hover:text-brand dark:hover:text-brand transition-colors duration-200">
                My Orders
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
