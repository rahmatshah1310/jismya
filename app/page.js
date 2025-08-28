"use client";

import { Suspense } from "react";
import { useGetAllCategories } from "../app/api/productApi";
import { ProductSection } from "../components/home/product-section";
import { ProductGridSkeleton } from "../components/skeletons/product-skeleton";
import { CarouselBanner } from "../components/home/carousel-banner";
import { PopularCategories } from "../components/home/popular-categories";
import { TrendingBrands } from "../components/home/trending-brands";
import { motion } from "framer-motion";

export default function HomePage() {
  const { data: categoryResponse, isLoading, error } = useGetAllCategories();
  const categories = categoryResponse?.data || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <CarouselBanner />

      {/* Popular Categories */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <PopularCategories />
      </motion.div>

      {/* Trending Brands */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <TrendingBrands />
      </motion.div>

      {/* Product Sections by Category */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        >
          <ProductGridSkeleton count={4} />
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        >
          <p className="text-center text-gray-600">
            Error loading categories: {error.message || "Unknown error"}
          </p>
        </motion.div>
      )}

      {!isLoading && !error && categories.length > 0 && (
        categories.map((cat, index) => (
          <Suspense key={cat._id} fallback={<ProductGridSkeleton count={4} />}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <ProductSection title={cat.name} category={cat._id} />
            </motion.div>
          </Suspense>
        ))
      )}
    </div>
  );
}
