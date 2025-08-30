"use client";

import { useState, useEffect } from "react";
import { useBannersByDevice } from "../../app/api/bannerApi";
import { Button } from "../ui/button";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { CarouselSkeleton } from "../skeletons/product-skeleton";

export function CarouselBanner() {
  const [deviceType, setDeviceType] = useState("laptop");
  const [activeIndex, setActiveIndex] = useState(0);

  // Detect device type
  useEffect(() => {
    const detectDevice = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType("mobile");
      } else if (width < 1024) {
        setDeviceType("tablet");
      } else {
        setDeviceType("laptop");
      }
    };

    detectDevice();
    window.addEventListener("resize", detectDevice);
    return () => window.removeEventListener("resize", detectDevice);
  }, []);

  // Fetch banners based on device type
  const { data: banners, isLoading, error } = useBannersByDevice(deviceType);

  if (isLoading) {
    return <CarouselSkeleton />;
  }

  if (error || !banners || banners.length === 0) {
    return <div className="flex w-full justify-center">{error}</div>; // Don't show anything if no banners
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
      className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 mt-6"
    >
      <div className="w-full mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px]  overflow-hidden shadow-2xl"
        >
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          effect="fade"
          spaceBetween={0}
          slidesPerView={1}
          navigation={{
            nextEl: ".carousel-button-next",
            prevEl: ".carousel-button-prev",
          }}
          pagination={{
            clickable: true,
            el: ".carousel-pagination",
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={banners.length > 1}
          className="h-full"
          onSlideChange={(sw) => setActiveIndex(sw.realIndex)}
          onAfterInit={(sw) => setActiveIndex(sw.realIndex || 0)}
        >
          {banners.map((banner, index) => {
            const isActive = index === activeIndex;
            return (
              <SwiperSlide key={banner._id || index}>
                <div className="relative w-full h-full">
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${banner.imageUrl})` }}
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
                    <h2
                      className={`text-2xl md:text-5xl font-bold mb-3 ${isActive ? "animate-slide-up" : ""}`}
                      style={{ animationDuration: "400ms" }}
                    >
                      {banner.heading}
                    </h2>

                    {banner.description && (
                      <p
                        className={`text-white/90 mb-4 max-w-md ${isActive ? "animate-fade-in" : ""}`}
                        style={{ animationDuration: "450ms", animationDelay: "80ms" }}
                      >
                        {banner.description}
                      </p>
                    )}

                    {banner.ctaText && banner.ctaLink && (
                      <Link href={banner.ctaLink}>
                        <Button
                          size="lg"
                          className={`${isActive ? "animate-scale-in" : ""}`}
                          style={{ animationDuration: "300ms", animationDelay: "120ms" }}
                        >
                          {banner.ctaText}
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            );
          })}

          {/* Pagination */}
          <div className="carousel-pagination absolute bottom-4 left-0 right-0 flex justify-center z-20"></div>

          {/* Navigation */}
          <div className="carousel-button-prev absolute left-4 top-1/2 -translate-y-1/2 z-20 cursor-pointer text-white select-none">‹</div>
          <div className="carousel-button-next absolute right-4 top-1/2 -translate-y-1/2 z-20 cursor-pointer text-white select-none">›</div>
        </Swiper>
        </motion.div>
      </div>
    </motion.div>
  );
}