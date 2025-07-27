"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroCarousel({ banners }) {
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
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <section className="relative mx-auto mt-20 flex items-center w-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
        className="h-full w-full"
      >
        {banners?.map((slide, index) => (
          <SwiperSlide
            key={index}
            className="relative flex justify-center items-center min-h-[300px] sm:min-h-[400px] md:min-h-[500px]"
          >
            <Image
              src={slide.imageUrl}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover rounded-2xl"
              priority={index === 0}
            />
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
                    <motion.p
                      variants={slideVariants}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="text-sm sm:text-base md:text-lg mb-4"
                    >
                      {slide.description}
                    </motion.p>
                    <motion.p
                      variants={slideVariants}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="text-sm sm:text-base md:text-lg mb-4"
                    >
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
  );
}
