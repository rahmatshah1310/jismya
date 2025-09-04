"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Link from "next/link";

// Import Swiper styles
import "swiper/css/pagination";
import "swiper/css";

import { useBannersByDevice } from "@/app/api/bannerApi";
import { CarouselSkeleton } from "@/components/skeletons/product-skeleton";

const HeroCarousal = () => {
  const [deviceType, setDeviceType] = useState("laptop");

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

  // Fetch banners from API
  const { data: banners, isLoading, error } = useBannersByDevice(deviceType);

  if (isLoading) return <CarouselSkeleton />;
  if (error || !banners || banners.length === 0) return null;

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      className="hero-carousel"
    >
      {banners.map((banner, index) => (
        <SwiperSlide key={banner._id || index}>
          <div
            className="relative max-w-7xl flex items-center justify-center h-[400px] sm:h-[500px] lg:h-[500px] bg-cover bg-center"
            style={{ backgroundImage: `url(${banner.imageUrl || "/images/hero/hero-01.png"})` }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl text-center px-4 text-white">
              

              <h1 className="font-semibold text-2xl sm:text-4xl lg:text-5xl mb-4">
                <Link href={banner.ctaLink || "#"}>{banner.heading}</Link>
              </h1>

              {banner.description && <p className="text-white/90 mb-6">{banner.description}</p>}

              {banner.ctaText && banner.ctaLink && (
                <Link
                  href={banner.ctaLink}
                  className="inline-flex font-medium text-white text-lg rounded-md bg-blue-600 py-3 px-9 ease-out duration-200 hover:bg-blue-700"
                >
                  {banner.ctaText}
                </Link>
              )}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroCarousal;
