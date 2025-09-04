"use client";

import { useSearchParams } from "next/navigation";
import { useSearchProducts } from "@/app/api/productApi";
import { ProductGridSkeleton } from "@/components/skeletons/product-skeleton";
import ProductCard from "@/components/products/product-card";
import Link from "next/link";

const SearchPageContent = () => {
  const searchParams = useSearchParams();
  const item = searchParams.get("item") || "";

  const { data, isLoading, error } = useSearchProducts(item);

  // Extract products from API response safely
  const products = data?.data?.results || [];
  const totalResults = data?.data?.totalResults || products.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Results</h1>
            {!isLoading && !error && (
              <p className="text-gray-600">
                Found {totalResults} product{totalResults !== 1 ? "s" : ""} for &quot;{item}&quot;
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="text-center">
            <ProductGridSkeleton count={12} />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{String(error)}</h3>
            <button onClick={() => window.location.reload()} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Try Again
            </button>
          </div>
        ) : products.length > 0 ? (
          <>
            {/* Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7.5">
              {products.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
            </div>

            {/* Results Summary */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Showing {products.length} of {totalResults} results
              </p>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              We couldn&apos;t find any products matching &quot;{item}&quot;. Try adjusting your search terms or browse our categories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => window.history.back()} className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                Go Back
              </button>
              <Link href="/" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Browse Categories
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPageContent;
