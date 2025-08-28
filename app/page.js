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

  // Show loading state for the entire page while categories are loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <CarouselBanner />
        <PopularCategories />
        <TrendingBrands />
        
        {/* Show multiple skeleton sections while loading */}
        {[1, 2, 3].map((index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Loading...</h2>
                <p className="text-gray-600">Please wait while we load products</p>
              </div>
            </div>
            <ProductGridSkeleton count={6} />
          </motion.div>
        ))}
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <CarouselBanner />
        <PopularCategories />
        <TrendingBrands />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Products</h2>
            <p className="text-gray-600 mb-4">
              {error.message || "Failed to load product categories. Please try refreshing the page."}
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

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
      {categories.length > 0 ? (
        categories.map((cat, index) => (
          <Suspense key={cat._id} fallback={<ProductGridSkeleton count={6} />}>
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
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Categories Found</h2>
            <p className="text-gray-600">No product categories are available at the moment.</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
