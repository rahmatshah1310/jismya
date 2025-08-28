"use client";

import { useState } from "react";
import { ProductGridSkeleton } from "../skeletons/product-skeleton";
import { useGetSingleCategory, useProductsByCategory } from "../../app/api/productApi";
import { HiOutlineX } from "react-icons/hi";
import ProductCard from "./product-card";

export function ProductGrid({ categoryId }) {
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const { data: categoryData, isLoading: categoryLoading } = useGetSingleCategory(categoryId);
  const categoryName = categoryData?.data?.name || "Category";

  // Fetch all products in category
  const { data: categoryProducts, isLoading, error } = useProductsByCategory(categoryId);
  // Sorting
  const products = categoryProducts?.data || [];
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "newest":
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      case "oldest":
        return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
      default:
        return 0;
    }
  });

  // Pagination
  const productsPerPage = 12;
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const displayedProducts = sortedProducts.slice(startIndex, endIndex);

  const handleLoadMore = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  if (isLoading) {
    return (
      <div className="container-custom py-10">
        <ProductGridSkeleton count={8} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-custom py-8 text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <HiOutlineX className="w-10 h-10 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{error}</h2>
        <button onClick={() => window.location.reload()} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container-custom py-10 px-4 sm:px-14">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in-up">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-ink dark:text-d-ink">{categoryName} Category</h1>
        <p className="text-ink/70 dark:text-d-ink/70">
          Showing {displayedProducts.length} of {products.length} products
        </p>

        {/* Sort Options */}
        <div className="sm:w-56 mt-4 sm:mt-0">
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="w-full px-3 py-2 border border-border dark:border-d-border bg-white dark:bg-d-card text-ink dark:text-d-ink rounded-xl focus:ring-2 focus:ring-brand/30 focus:border-brand/40 transition-colors"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {displayedProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 md:gap-8 mb-10">
            {displayedProducts.map((product) => (
              <div key={product._id} className="animate-fade-in">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center">
              {currentPage < totalPages ? (
                <button
                  onClick={handleLoadMore}
                  className="bg-brand hover:bg-brand-600 text-white px-8 py-3 rounded-2xl shadow-card hover:shadow-hover transition-all duration-200 font-medium"
                >
                  Load More Products
                </button>
              ) : (
                <p className="text-ink/70 dark:text-d-ink/70 text-center py-4">Youve reached the end of all products.</p>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-ink dark:text-d-ink mb-2">No Products Found</h3>
          <p className="text-ink/70 dark:text-d-ink/70 mb-4">No products found in this category.</p>
        </div>
      )}
    </div>
  );
}
