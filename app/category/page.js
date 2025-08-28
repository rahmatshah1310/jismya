"use client";

import Link from "next/link";
import { useGetAllCategories } from "../api/productApi";
import { ProductGridSkeleton } from "../../components/skeletons/product-skeleton";

export default function CategoriesPage() {
  const { data: categoriesResponse, isLoading, error } = useGetAllCategories();
  const categories = categoriesResponse?.data || [];

  if (isLoading) {
    return (
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">All Categories</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="h-4 bg-gray-200 rounded mb-3"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-custom py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Categories</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">All Categories</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category._id}
            href={`/category/${category._id}`}
            className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-blue-200 p-6"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">{category.name}</h3>
              {category.description && <p className="text-sm text-gray-600 line-clamp-2">{category.description}</p>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
