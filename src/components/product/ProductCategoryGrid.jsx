"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useCart } from "@/context/CartContext";

export default function ProductCategoryGrid({ products }) {
  const { addToCart } = useCart();
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  if (!products || products.length === 0) return null;

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Swiper
        modules={[Navigation]}
        navigation={hovered}
        slidesPerView={1}
        className="bg-white shadow-lg rounded-2xl !p-5"
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {products.map((product, index) => (
          <SwiperSlide key={product._id}>
            <div
              className="flex flex-col items-center text-center px-2 cursor-pointer transform transition-transform duration-300 hover:scale-105"
              onClick={() => router.push(`/cart/${product._id}`)}
            >
              <div className={`w-full ${index !== products.length - 1 ? 'border-r border-gray-200 pr-4' : ''}`}>
                <div className="relative h-48 w-full mb-3">
                  <Image
                    src={product.imageUrl}
                    alt={product.productName}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <h4 className="text-gray-800 font-semibold text-base">{product.productName}</h4>
                <p className="text-pink-500 font-bold text-sm">Rs. {product.price}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart({ ...product, quantity: 1 });
                  router.push(`/cart/${product._id}`);
                }}
                className="mt-2 bg-pink-500 hover:bg-pink-600 text-white py-1 px-3 rounded text-xs"
              >
                Add to Cart
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
