"use client";

import { useState } from "react";
import Link from "next/link";
import { HiOutlineLocationMarker, HiOutlinePhone, HiOutlineClock, HiOutlineShoppingBag, HiX } from "react-icons/hi";
import { FaFacebook, FaInstagram, FaTiktok, FaLinkedin, FaYoutube } from "react-icons/fa";

export function Footer() {
  const [isOnSaleVisible, setIsOnSaleVisible] = useState(true);

  return (
    <footer className="bg-ink dark:bg-d-bg text-white dark:text-d-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-serif font-semibold mb-3 sm:mb-4 text-white dark:text-d-ink">user.pk</h3>
            <p className="text-white/70 dark:text-d-ink/70 mb-3 sm:mb-4 text-sm sm:text-base">Pakistan's leading e-commerce platform for health & beauty, electronics, fashion, and more.</p>
            <div className="flex justify-center sm:justify-start space-x-4">
              <a href="#" className="text-white/70 dark:text-d-ink/70 hover:text-brand dark:hover:text-brand transition-colors duration-200">
                Facebook
              </a>
              <a href="#" className="text-white/70 dark:text-d-ink/70 hover:text-brand dark:hover:text-brand transition-colors duration-200">
                Twitter
              </a>
              <a href="#" className="text-white/70 dark:text-d-ink/70 hover:text-brand dark:hover:text-brand transition-colors duration-200">
                Instagram
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-serif font-semibold mb-3 sm:mb-4 text-white dark:text-d-ink">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-white/70 dark:text-d-ink/70 hover:text-brand dark:hover:text-brand transition-colors duration-200 text-sm sm:text-base">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/70 dark:text-d-ink/70 hover:text-brand dark:hover:text-brand transition-colors duration-200 text-sm sm:text-base">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/" className="text-white/70 dark:text-d-ink/70 hover:text-brand dark:hover:text-brand transition-colors duration-200 text-sm sm:text-base">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-white/70 dark:text-d-ink/70 hover:text-brand dark:hover:text-brand transition-colors duration-200 text-sm sm:text-base">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-serif font-semibold mb-3 sm:mb-4 text-white dark:text-d-ink">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-white/70 dark:text-d-ink/70 hover:text-brand dark:hover:text-brand transition-colors duration-200 text-sm sm:text-base">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-white/70 dark:text-d-ink/70 hover:text-brand dark:hover:text-brand transition-colors duration-200 text-sm sm:text-base">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-white/70 dark:text-d-ink/70 hover:text-brand dark:hover:text-brand transition-colors duration-200 text-sm sm:text-base">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-white/70 dark:text-d-ink/70 hover:text-brand dark:hover:text-brand transition-colors duration-200 text-sm sm:text-base">
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-serif font-semibold mb-3 sm:mb-4 text-white dark:text-d-ink">Contact Us</h3>
            <div className="space-y-2 text-white/70 dark:text-d-ink/70 text-sm sm:text-base">
              <p>Phone: (021) 111-624-333</p>
              <p>Email: info@user.pk</p>
              <p>Address: Karachi, Pakistan</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 dark:border-d-ink/20 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-white/70 dark:text-d-ink/70">
          <p className="text-sm sm:text-base">&copy; 2024 user.pk. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
