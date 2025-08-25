"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  HiOutlineMenu,
  HiOutlineSearch,
  HiOutlineUser,
  HiOutlineHeart,
  HiOutlineShoppingCart,
  HiOutlinePhone,
  HiX,
} from "react-icons/hi";
import { useGetAllCategories } from "../../app/api/productApi";
import { useCart } from "../../context/CartContext";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

function SearchBar() {
  return (
    <div className="relative">
      <Input
        placeholder="Search user"
        className="w-full pl-4 pr-12 py-3 rounded-lg border-0 bg-gray-100 focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-200"
      />
      <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
        <HiOutlineSearch className="w-5 h-5" />
      </button>
    </div>
  );
}

function CategoriesButton({ categories }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button
          variant="outline"
          className="w-full border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        >
          <HiOutlineMenu className="w-5 h-5 mr-2" />
          CATEGORIES
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        sideOffset={8}
        className="w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-2"
      >
        <DropdownMenu.Item asChild>
          <Link
            href="/category"
            className="block px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-gray-900 font-medium border-b border-gray-100 mb-2"
          >
            View All Categories
          </Link>
        </DropdownMenu.Item>

        {categories.slice(0, 8).map((category) => (
          <DropdownMenu.Item key={category._id} asChild>
            <Link
              href={`/category/${category._id}`}
              className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-gray-900"
            >
              <span className="font-medium">{category.name}</span>
              <span className="text-xs text-gray-500">→</span>
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
    <header className="sticky top-0 z-50 bg-gray-50 shadow-lg">
      {/* Main Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-4">
          {/* Single responsive layout */}
          <div className="grid grid-cols-12 items-center gap-4">
            {/* Logo */}
            <div className="col-span-6 sm:col-span-4 md:col-span-2">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 md:w-10 h-8 md:h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-gray-700 font-bold text-lg md:text-xl">N</span>
                </div>
                <span className="text-gray-800 text-xl md:text-2xl font-bold">user</span>
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
            <div className="hidden md:flex md:col-span-2 items-center justify-end gap-6">
              <button className="flex flex-col items-center text-gray-700 hover:text-gray-900 transition-colors">
                <HiOutlineUser className="w-6 h-6" />
                <span className="text-xs">Hello, Sign In</span>
              </button>

              <button className="flex flex-col items-center text-gray-700 hover:text-gray-900 transition-colors">
                <HiOutlineHeart className="w-6 h-6" />
                <span className="text-xs">0 item</span>
              </button>

              <Link
                href="/cart"
                className="flex flex-col items-center text-gray-700 hover:text-gray-900 transition-colors relative"
              >
                <HiOutlineShoppingCart className="w-6 h-6" />
                <span className="text-xs">Cart</span>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount || 0}
                </span>
              </Link>
            </div>

            {/* Actions - Mobile (cart + menu) */}
            <div className="col-span-6 sm:col-span-8 md:hidden flex items-center justify-end gap-3">
              <Link href="/cart" className="text-gray-700 relative">
                <HiOutlineShoppingCart className="w-6 h-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700"
              >
                <HiOutlineMenu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-50" onClick={closeMobileMenu}>
          <div
            className="absolute top-0 right-0 h-full w-80 bg-card shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Menu</h3>
                <button
                  onClick={closeMobileMenu}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <HiX className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <button className="flex items-center gap-3 w-full text-left p-3 rounded-lg hover:bg-muted transition-colors text-foreground">
                  <HiOutlineUser className="w-5 h-5" />
                  <span>Hello, Sign In</span>
                </button>

                <button className="flex items-center gap-3 w-full text-left p-3 rounded-lg hover:bg-muted transition-colors text-foreground">
                  <HiOutlineHeart className="w-5 h-5" />
                  <span>Wishlist (0 items)</span>
                </button>

                {/* Reuse same categories component inside the drawer */}
                <CategoriesButton categories={categories} />

                <div className="border-t border-border pt-4">
                  <h4 className="font-medium mb-3 text-foreground">Quick Links</h4>
                  <div className="space-y-2">
                    <Link href="/" className="block p-2 rounded hover:bg-muted transition-colors text-foreground">
                      Home
                    </Link>
                    <Link href="/contact" className="block p-2 rounded hover:bg-muted transition-colors text-foreground">
                      Contact
                    </Link>
                    <Link href="/about" className="block p-2 rounded hover:bg-muted transition-colors text-foreground">
                      About Us
                    </Link>
                    <Link href="/track-order" className="block p-2 rounded hover:bg-muted transition-colors text-foreground">
                      Track Order
                    </Link>
                    <Link href="/loyalty" className="block p-2 rounded hover:bg-muted transition-colors text-foreground">
                      user Loyalty
                    </Link>
                    <Link href="/affiliate" className="block p-2 rounded hover:bg-muted transition-colors text-foreground">
                      Affiliate Program
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Secondary Navigation (visible on md and up; no scroll behavior) */}
      <div className="hidden md:block bg-gray-100 border-b border-gray-200">
        <div className="container-custom py-3">
          <div className="hidden md:flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-gray-800 font-medium">Welcome To user.Pk!</span>
              <div className="flex items-center gap-2 text-gray-600">
                <HiOutlinePhone className="w-4 h-4" />
                <span className="text-sm">(021) 111-624-333</span>
              </div>
            </div>

            <nav className="flex items-center gap-6 text-sm text-gray-600">
              <Link href="/" className="hover:text-gray-900 transition-colors">
                Home
              </Link>
              <Link href="/contact" className="hover:text-gray-900 transition-colors">
                Contact
              </Link>
              <Link href="/about" className="hover:text-gray-900 transition-colors">
                About Us
              </Link>
              <Link href="/track-order" className="hover:text-gray-900 transition-colors">
                Track Order
              </Link>
              <Link href="/loyalty" className="hover:text-gray-900 transition-colors">
                user Loyalty
              </Link>
              <Link href="/affiliate" className="hover:text-gray-900 transition-colors">
                Affiliate Program
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}