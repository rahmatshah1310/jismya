"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { HiOutlineShoppingCart, HiOutlineHeart } from "react-icons/hi";
import { useCart } from "../../context/CartContext";
import { useProductsByCategory } from "../../app/api/productApi";
import { ProductGridSkeleton } from "../skeletons/product-skeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const truncateText = (text, maxLength) => {
  if (!text) return "";
  return text.length <= maxLength ? text : text.slice(0, maxLength) + "...";
};

export function ProductSection({ title, category, showViewAll = true, maxProducts = 6, isLoading = false }) {
  const { addToCart, processingItems, toggleWishlist, wishlist } = useCart();
  const { data: apiResponse, isLoading: apiLoading, error } = useProductsByCategory(category);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (isLoading || apiLoading) {
    return <ProductGridSkeleton count={maxProducts} />;
  }

  const products = apiResponse?.data || [];
  const displayedProducts = products.slice(0, maxProducts);

  if (!products || products.length === 0) {
    return (
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{title}</h2>
          <p className="text-center text-gray-600">No products found.</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{title}</h2>
          <p className="text-center text-gray-600">{error.message || "Error loading products"}</p>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-12 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{title}</h2>
            <p className="text-gray-600">Discover our latest collection</p>
          </div>
          {showViewAll && (
            <Link href={`/category/${category}`}>
              <Button className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                View All Products
              </Button>
            </Link>
          )}
        </motion.div>

        <div className="relative w-full group/carousel">
          <div className="w-full overflow-hidden bg-white rounded-2xl shadow-lg border border-gray-100 p-1">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView="auto"
              autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
              loop={displayedProducts.length > 3}
              navigation={{
                nextEl: `.product-swiper-next-${category}`,
                prevEl: `.product-swiper-prev-${category}`,
              }}
              pagination={{ clickable: true, el: `.product-swiper-pagination-${category}` }}
              className="w-full [&_.swiper-wrapper]:flex [&_.swiper-wrapper]:items-stretch"
            >
              {displayedProducts.map((product, index) => (
                <SwiperSlide
                  key={product._id}
                  className="!w-72 flex-shrink-0 border border-transparent hover:border-blue-200 hover:rounded-xl transition-all duration-300"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="h-full flex flex-col p-4 hover:shadow-xl transition-all duration-300 group/slide relative bg-white rounded-xl"
                  >
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
                        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                          {product.discount}% OFF
                        </div>
                      )}

                      {/* Hover actions */}
                      <div className="absolute bottom-3 right-3 opacity-0 group-hover/slide:opacity-100 transition-all duration-300 transform translate-y-2 group-hover/slide:translate-y-0">
                        <div className="flex gap-2">
                          <button
                            onClick={() => addToCart({ _id: product._id, name: product.productName, price: product.price, image: product.imageUrl }, 1)}
                            disabled={processingItems[product._id]}
                            className={`w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 ${
                              processingItems[product._id] ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
                            }`}
                            title="Add to Cart"
                          >
                            {processingItems[product._id] ? (
                              <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                              <HiOutlineShoppingCart className="w-5 h-5" />
                            )}
                          </button>
                          <button
                            onClick={() => toggleWishlist(product)}
                            className={`w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 ${
                              wishlist.find((item) => item._id === product._id)
                                ? "bg-red-50 text-red-500"
                                : "bg-white text-gray-600 hover:text-red-500 hover:bg-white"
                            }`}
                            title={wishlist.find((item) => item._id === product._id) ? "Remove from Wishlist" : "Add to Wishlist"}
                          >
                            <HiOutlineHeart className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-center">
                      <h3 className="text-sm font-semibold text-gray-900 text-center">{truncateText(product.productName, 40)}</h3>
                      <p className="text-lg font-bold text-gray-900 mt-2">Rs. {product.price}</p>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Arrows */}
          <button
            className={`product-swiper-prev-${category} absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-white border border-gray-200 shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 text-gray-600 hover:bg-gray-50 hover:border-blue-300 opacity-0 group-hover/carousel:opacity-100`}
          >
            ‹
          </button>
          <button
            className={`product-swiper-next-${category} absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-white border border-gray-200 shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 text-gray-600 hover:bg-gray-50 hover:border-blue-300 opacity-0 group-hover/carousel:opacity-100`}
          >
            ›
          </button>

          <div className={`product-swiper-pagination-${category} flex justify-center mt-6`} />
        </div>

        {/* Mobile "View All" */}
        {showViewAll && (
          <div className="text-center mt-8 md:hidden">
            <Link href={`/category/${category}`}>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">View All Products</Button>
            </Link>
          </div>
        )}
      </div>
    </motion.section>
  );
}
