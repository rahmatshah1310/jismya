"use client";

import { useSearchParams } from "next/navigation";
import { useSearchProducts } from "@/app/api/productApi";
import { ProductGridSkeleton } from "@/components/skeletons/product-skeleton";
import ProductCard from "@/components/products/product-card";

export default function SearchPageContent() {
  const searchParams = useSearchParams();
  const item = searchParams.get("item") || "";

  const { data, isLoading, error } = useSearchProducts(item);

  // Extract products from API response safely
  const products = data?.data?.results || [];
  const totalResults = data?.data?.totalResults || products.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Results</h1>
            {!isLoading && !error && (
              <p className="text-gray-600">
                Found {totalResults} products for `{item}`
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="text-center text-gray-600 py-12">
            <ProductGridSkeleton count={10} />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-12">Error: {error}</div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-gray-500 font-medium text-lg mb-2">No products found</p>
            <p className="text-gray-400">Try adjusting your search terms or browse our categories</p>
          </div>
        )}
      </div>
    </div>
  );
}
