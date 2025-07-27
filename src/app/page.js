"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { slides, policy, category, cartItems } from "@/constants/data";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import InputField from "@/components/ui/InputField";
import { useBannersByDevice, useGetBanners } from "./api/bannerApi";
import { useGetAllProducts } from "./api/productApi";
import ProductCategoryGrid from "@/components/product/ProductCategoryGrid";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [deviceType, setDeviceType] = useState("laptop");

  const { data: laptopBanners } = useBannersByDevice("laptop");
  const { data: tabletBanners } = useBannersByDevice("tablet");
  const { data: mobileBanners } = useBannersByDevice("mobile");

  const { data: allProductsData, isLoading } = useGetAllProducts();
  const products = allProductsData?.data || [];

  const router = useRouter();

  useEffect(() => {
    const updateDeviceType = () => {
      const width = window.innerWidth;
      if (width < 768) setDeviceType("mobile");
      else if (width < 1024) setDeviceType("tablet");
      else setDeviceType("laptop");
    };

    updateDeviceType();
    window.addEventListener("resize", updateDeviceType);
    return () => window.removeEventListener("resize", updateDeviceType);
  }, []);

  const banners = deviceType === "mobile" ? mobileBanners : deviceType === "tablet" ? tabletBanners : laptopBanners;

  const { addToCart } = useCart();
  const sortedBanners = banners?.slice().sort((a, b) => a.order - b.order) || [];

  const slideVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: -20,
    },
  };

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
  };

  return (
    <main className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
      {/* Hero Section */}
      <section className="relative mx-auto mt-20 flex items-center w-full">
        <Swiper
          modules={[Autoplay, Pagination]}
          loop
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
          className="h-full w-full"
        >
          {sortedBanners?.map((slide, index) => (
            <SwiperSlide key={index} className="relative flex justify-center items-center min-h-[300px] sm:min-h-[400px] md:min-h-[500px]">
              <Image src={slide.imageUrl} alt={`Slide ${index + 1}`} fill className="object-cover rounded-2xl" priority={index === 0} />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 sm:px-8">
                <AnimatePresence mode="wait">
                  {currentSlide === index && (
                    <motion.div
                      key={`slide-${index}`}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 },
                        exit: { opacity: 0 },
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.h2
                        variants={slideVariants}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-2"
                      >
                        {slide.heading}
                      </motion.h2>
                      <motion.p variants={slideVariants} transition={{ duration: 0.8, delay: 0.4 }} className="text-sm sm:text-base md:text-lg mb-4">
                        {slide.description}
                      </motion.p>
                      <motion.p variants={slideVariants} transition={{ duration: 0.8, delay: 0.4 }} className="text-sm sm:text-base md:text-lg mb-4">
                        {slide.deviceType}
                      </motion.p>
                      {/* <motion.div variants={slideVariants} transition={{ duration: 0.8, delay: 0.6 }}>
                        <Link
                          href={slide.buttonLink}
                          className="inline-block bg-pink-500 hover:bg-pink-600 px-6 py-2 rounded-md text-white text-sm"
                        >
                          {slide.buttonText}
                        </Link>
                      </motion.div> */}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <section id="categories" className="py-10 px-2 sm:px-4 md:px-8 bg-[var(--color-white)]">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-[var(--color-pink-600)]">Shop by Category</h2>
<div className="grid grid-cols-1 gap-10">
  {[...new Set(products.map((p) => p.categoryName))].map((category) => {
    const filteredProducts = products.filter((p) => p.categoryName === category);

    return (
      <section key={category} className="mb-10">
        <h3 className="text-xl font-semibold mb-4 text-[var(--color-pink-600)]">{category}</h3>
        {filteredProducts.length === 0 ? (
          <p className="text-gray-400">No products found in this category.</p>
        ) : (
          <ProductCategoryGrid products={filteredProducts} />
        )}
      </section>
    );
  })}
</div>

        </div>
      </section>

      {/* Return Policy Section */}
      <section id="return-policy" className="py-10 sm:py-16 px-2 sm:px-4 md:px-8 bg-[var(--color-gray-50)]">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-[var(--color-pink-600)]">Our Return Policy</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {policy.map((item) => (
              <div key={item.title} className="bg-[var(--color-white)] p-6 sm:p-8 rounded-lg text-center transform hover:-translate-y-2 transition-transform">
                <i className={`fas ${item.icon} text-3xl sm:text-4xl text-[var(--color-pink-500)] mb-4`}></i>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 text-[var(--color-pink-600)]">{item.title}</h3>
                <p className="text-[var(--color-gray-600)] text-sm sm:text-base">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-8 sm:py-14 px-2 sm:px-4 md:px-8 sm:mx-5 bg-gradient-to-r from-pink-500 to-pink-600 text-[var(--color-white)] w-full md:w-[90%] rounded-2xl md:mx-auto">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">Special Offer</h2>
          <p className="text-base sm:text-xl mb-4 sm:mb-8">Get 20% off on your first purchase</p>
          <Link
            href="#shop-now"
            className="inline-block bg-[var(--color-white)] text-pink-500 px-6 sm:px-8 py-2 sm:py-3 rounded-md hover:bg-[var(--color-gray-100)] transition-colors font-semibold text-sm sm:text-base"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-10 sm:py-16 px-2 sm:px-4 md:px-8 bg-[var(--color-white)]">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4 text-[var(--color-pink-600)]">Subscribe to Our Newsletter</h2>
          <p className="mb-4 sm:mb-8 text-[var(--color-gray-600)] text-sm sm:text-base">Get updates on new arrivals and exclusive offers</p>
          <form className="flex flex-col md:flex-row gap-3 sm:gap-4">
            <InputField
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-[var(--color-gray-300)] rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm sm:text-base"
            />
            <Button
              type="submit"
              className="bg-[var(--color-pink-500)] text-[var(--color-white)] px-6 sm:px-8 py-2 sm:py-3 rounded-md hover:bg-[var(--color-pink-600)] transition-colors text-sm sm:text-base"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      {/* WhatsApp Button */}
      <Link
        href="https://wa.me/923488597922"
        className="fixed right-4 bottom-4 sm:right-6 sm:bottom-6 bg-[var(--color-green-500)] text-[var(--color-white)] w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-xl sm:text-2xl shadow-lg hover:scale-110 transition-transform z-50"
        target="_blank"
      >
        <i className="fab fa-whatsapp"></i>
      </Link>
    </main>
  );
}
