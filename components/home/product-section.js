"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { HiOutlineShoppingCart, HiOutlinePlus, HiOutlineHeart } from "react-icons/hi";
import { useCart } from "../../context/CartContext";
import { useProductsByCategory } from "../../app/api/productApi";
import { ProductGridSkeleton } from "../skeletons/product-skeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { toast } from "react-toastify";

const truncateText = (text, maxLength) => {
  if (!text) return "";
  return text.length <= maxLength ? text : text.slice(0, maxLength) + "...";
};

export function ProductSection({ title, category, showViewAll = true, maxProducts = 6, isLoading = false }) {
  const { data: apiResponse, isLoading: apiLoading, error } = useProductsByCategory(category);

  const { addToCart, processingItems } = useCart();

  const products = apiResponse?.data || [];
  const displayedProducts = products.slice(0, maxProducts);

  // Loading
  if (isLoading || apiLoading) {
    return (
      <section className="py-8 sm:py-12 md:py-16 bg-white dark:bg-d-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 gap-4">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-ink dark:text-d-ink">{title}</h2>
            {showViewAll && (
              <Button variant="outline" className="hidden md:block">
                View All
              </Button>
            )}
          </div>
          <ProductGridSkeleton count={maxProducts} />
        </div>
      </section>
    );
  }

  // Error
  if (error) {
    return (
      <section className="py-8 sm:py-12 md:py-16 bg-white dark:bg-d-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 gap-4">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-ink dark:text-d-ink">{title}</h2>
          </div>
          <p className="text-center text-ink/60 dark:text-d-ink/60">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-sand/30 dark:bg-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 gap-4">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-ink dark:text-d-ink">{title}</h2>
          {showViewAll && (
            <Link href={`/category/${category}`}>
              <Button className="hidden md:block bg-brand hover:bg-brand-600 text-white border-brand hover:border-brand-600">View All</Button>
            </Link>
          )}
        </div>

        {displayedProducts.length > 0 ? (
          <>
            <div className="relative w-full group/carousel">
              <div className="w-full overflow-hidden bg-white dark:bg-d-card rounded-2xl shadow-card border border-border dark:border-d-border p-1">
                <Swiper
                  modules={[Navigation, Pagination]}
                  spaceBetween={0}
                  slidesPerView="auto"
                  navigation={{
                    nextEl: `.product-swiper-next-${category}`,
                    prevEl: `.product-swiper-prev-${category}`,
                  }}
                  pagination={{
                    clickable: true,
                    el: `.product-swiper-pagination-${category}`,
                  }}
                  className="w-full [&_.swiper-wrapper]:flex [&_.swiper-wrapper]:items-stretch"
                >
                  {displayedProducts.map((product) => (
                    <SwiperSlide
                      key={product._id}
                      className="!w-64 flex-shrink-0 border border-transparent hover:border-brand/30 dark:hover:border-brand/30 hover:rounded-2xl transition-all duration-300"
                    >
                      <div className="dark:bg-d-card h-full flex flex-col p-3 hover:shadow-hover transition-all duration-300 group/slide relative">
                        <div className="relative aspect-square overflow-hidden mb-3">
                          <Link href={`/product/${product._id}`} className="block w-full h-full">
                            <div className="relative w-full h-full">
                              <Image
                                src={product.imageUrl}
                                alt={product.productName}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw,33vw"
                                className="object-cover transition-transform duration-300 group-hover/slide:scale-105"
                              />
                            </div>
                          </Link>

                          {product.discount > 0 && (
                            <div className="absolute top-2 left-2 bg-brand text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-soft animate-scale-in">
                              {product.discount}% OFF
                            </div>
                          )}

                          {/* Hover actions */}
                          <div className="absolute bottom-2 left-2 opacity-0 group-hover/slide:opacity-100 transition-all duration-300 transform translate-y-2 group-hover/slide:translate-y-0">
                            <div className="flex flex-col gap-2">
                              <button
                                onClick={() =>
                                  addToCart(
                                    {
                                      _id: product._id,
                                      name: product.productName,
                                      price: product.price,
                                      image: product.imageUrl,
                                    },
                                    1
                                  )
                                }
                                disabled={processingItems[product._id]} // 👈 disable when busy
                                className={`w-10 h-10 rounded-xl shadow-card flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 ${
                                  processingItems[product._id]
                                    ? "bg-sand/60 dark:bg-white/20 text-ink/50 dark:text-d-ink/50 cursor-not-allowed"
                                    : "bg-brand hover:bg-brand-600 text-white"
                                }`}
                                title="Add to Cart"
                              >
                                {processingItems[product._id] ? (
                                  <span className="text-xs">...</span>
                                ) : (
                                  <div className="relative">
                                    <HiOutlineShoppingCart className="w-5 h-5" />
                                    <HiOutlinePlus className="w-3 h-3 absolute -top-1 -right-1 bg-white text-brand rounded-full" />
                                  </div>
                                )}
                              </button>

                              <button
                                className="w-10 h-10 bg-white dark:bg-d-card hover:bg-sand/40 dark:hover:bg-white/20 text-ink dark:text-d-ink hover:text-rose rounded-xl shadow-card flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
                                title="Add to Wishlist"
                              >
                                <HiOutlineHeart className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-center">
                          <h3 className="text-sm font-medium text-ink dark:text-d-ink">{truncateText(product.productName, 40)}</h3>
                          <p className="text-sm text-ink/70 dark:text-d-ink/70 mt-1">Rs.{product.price}</p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Arrows */}
              <button
                className={`product-swiper-prev-${category} absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-white dark:bg-d-card border border-border dark:border-d-border shadow-card flex items-center justify-center transition-all duration-200 hover:scale-105 text-ink dark:text-d-ink hover:bg-sand/40 dark:hover:bg-white/20 hover:border-brand/30 dark:hover:border-brand/30 opacity-0 group-hover/carousel:opacity-100`}
              >
                ‹
              </button>
              <button
                className={`product-swiper-next-${category} absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-white dark:bg-d-card border border-border dark:border-d-border shadow-card flex items-center justify-center transition-all duration-200 hover:scale-105 text-ink dark:text-d-ink hover:bg-sand/40 dark:hover:bg-white/20 hover:border-brand/30 dark:hover:border-brand/30 opacity-0 group-hover/carousel:opacity-100`}
              >
                ›
              </button>

              <div className={`product-swiper-pagination-${category} flex justify-center mt-6`} />
            </div>
          </>
        ) : (
          <p className="text-center text-ink/60 dark:text-d-ink/60">No products found in category: {category}</p>
        )}

        {/* Mobile "View All" */}
        {showViewAll && (
          <div className="text-center mt-6 sm:mt-8 md:hidden">
            <Link href={`/category/${category}`}>
              <Button className="bg-brand hover:bg-brand-600 text-white border-brand hover:border-brand-600">View All</Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
