"use client"

import { Suspense } from "react"
import { useGetAllCategories } from "../app/api/productApi"
import { ProductSection } from "../components/home/product-section"
import { ProductGridSkeleton } from "../components/skeletons/product-skeleton"
import { CarouselBanner } from "../components/home/carousel-banner"
import { PopularCategories } from "../components/home/popular-categories"
import { TrendingBrands } from "../components/home/trending-brands"

export default function HomePage() {
  const { data: categoryResponse, isLoading, error } = useGetAllCategories()
  const categories = categoryResponse?.data || []

  return (
    <div className="min-h-screen bg-cream dark:bg-d-bg animate-fade-in">
      <CarouselBanner />

      {/* Popular Categories */}
      <PopularCategories />

      {/* Trending Brands */}
      <TrendingBrands />

      {/* Product Sections */}
      {isLoading && (
        <ProductGridSkeleton count={4} />
      )}

      {!isLoading && !error && categories.map((cat) => (
        <Suspense key={cat._id} fallback={<ProductGridSkeleton count={4} />}>
          <ProductSection 
            title={cat.name} 
            category={cat._id}
          />
        </Suspense>
      ))}
    </div>
  )
}
