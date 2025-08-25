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

const truncateText = (text, maxLength) => {
  if (!text) return "";
  return text.length <= maxLength ? text : text.slice(0, maxLength) + "...";
};

export function ProductSection({ title, category, showViewAll = true, maxProducts = 6, isLoading = false }) {
  const { data: apiResponse, isLoading: apiLoading, error } = useProductsByCategory(category);

  const { addToCart, processingItems } = useCart(); // 👈 include processing state

  const products = apiResponse?.data || [];
  const displayedProducts = products.slice(0, maxProducts);

  // Loading
  if (isLoading || apiLoading) {
    return (
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 gap-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{title}</h2>
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
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 gap-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{title}</h2>
          </div>
          <p className="text-center text-gray-600">Failed to load products. Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gray-50">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 gap-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{title}</h2>
          {showViewAll && (
            <Link href={`/category/${category._id}`}>
              <Button className="hidden md:block bg-red-600 hover:bg-red-700 text-white border-red-600 hover:border-red-700">View All</Button>
            </Link>
          )}
        </div>

        {displayedProducts.length > 0 ? (
          <>
            <div className="relative w-full group/carousel">
              <div className="w-full overflow-hidden bg-white rounded-lg shadow-md border border-gray-200 p-1">
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
                      className="!w-64 flex-shrink-0 border border-transparent hover:border-blue-500 hover:rounded-xl transition-all duration-300"
                    >
                      <div className="bg-white h-full flex flex-col p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group/slide">
                        <div className="relative aspect-square overflow-hidden mb-3">
                          <Link href={`/product/${product._id}`}>
                            <Image
                              src={product.imageUrl}
                              alt={product.productName}
                              fill
                              className="object-cover transition-transform duration-300 group-hover/slide:scale-105"
                            />
                          </Link>

                          {product.discount > 0 && (
                            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
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
                                className={`w-10 h-10 rounded-lg shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 ${
                                  processingItems[product._id] ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
                                }`}
                                title="Add to Cart"
                              >
                                {processingItems[product._id] ? (
                                  <span className="text-xs">...</span>
                                ) : (
                                  <div className="relative">
                                    <HiOutlineShoppingCart className="w-5 h-5" />
                                    <HiOutlinePlus className="w-3 h-3 absolute -top-1 -right-1 bg-white text-blue-600 rounded-full" />
                                  </div>
                                )}
                              </button>

                              <button
                                className="w-10 h-10 bg-white hover:bg-gray-50 text-gray-600 hover:text-red-500 rounded-lg shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
                                title="Add to Wishlist"
                              >
                                <HiOutlineHeart className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-center">
                          <h3 className="text-sm font-medium text-gray-800">{truncateText(product.productName, 40)}</h3>
                          <p className="text-sm text-gray-600 mt-1">Rs.{product.price}</p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Arrows */}
              <button
                className={`product-swiper-prev-${category} absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-white border border-gray-300 shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 text-gray-700 hover:bg-gray-50 hover:border-gray-400 opacity-0 group-hover/carousel:opacity-100`}
              >
                ‹
              </button>
              <button
                className={`product-swiper-next-${category} absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-white border border-gray-300 shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 text-gray-700 hover:bg-gray-50 hover:border-gray-400 opacity-0 group-hover/carousel:opacity-100`}
              >
                ›
              </button>

              <div className={`product-swiper-pagination-${category} flex justify-center mt-6`} />
            </div>
          </>
        ) : (
          <p className="text-center text-muted-foreground">No products found in category: {category}</p>
        )}

        {/* Mobile "View All" */}
        {showViewAll && (
          <div className="text-center mt-6 sm:mt-8 md:hidden">
            <Link href={`/category/${category}`}>
              <Button className="bg-red-600 hover:bg-red-700 text-white border-red-600 hover:border-red-700">View All</Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
