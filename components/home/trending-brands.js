"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";

const brands = [
  {
    id: 1,
    name: "COLOR STUDIO",
    image: "/watch.jpg",
    discount: "FLAT 30% OFF",
    hasDiscount: true,
  },
  {
    id: 2,
    name: "Centrum",
    image: "/watch.jpg",
    hasDiscount: false,
  },
  {
    id: 3,
    name: "BIODERMA",
    image: "/watch.jpg",
    hasDiscount: false,
  },
  {
    id: 4,
    name: "Unilever",
    image: "/watch.jpg",
    hasDiscount: false,
  },
  {
    id: 5,
    name: "Remington",
    image: "/watch.jpg",
    hasDiscount: false,
  },
  {
    id: 6,
    name: "ZEENA",
    image: "/watch.jpg",
    hasDiscount: false,
  },
  {
    id: 7,
    name: "LOREAL",
    image: "/watch.jpg",
    hasDiscount: false,
  },
  {
    id: 8,
    name: "Neutrogena",
    image: "/watch.jpg",
    hasDiscount: false,
  },
  {
    id: 9,
    name: "PHILIPS",
    image: "/watch.jpg",
    hasDiscount: false,
  },
  {
    id: 10,
    name: "Brand X",
    image: "/watch.jpg",
    discount: "FLAT 30% OFF",
    hasDiscount: true,
  },
];

export function TrendingBrands() {
  
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 gap-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-0 text-center sm:text-left text-gray-800">Trending Brands</h2>
          <Button variant="outline" className="hidden md:block">
            View All
          </Button>
        </div>

        <div className="relative">
          <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {brands.map((brand) => (
              <div key={brand.id} className="flex-shrink-0">
                <Link href={`/brand/${brand.name.toLowerCase().replace(/\s+/g, "-")}`}>
                  <div className="relative group">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-card shadow-md group-hover:shadow-lg transition-shadow duration-300">
                      <Image
                        src={brand.image}
                        alt={brand.name}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Discount Badge */}
                    {brand.hasDiscount && (
                      <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">{brand.discount}</div>
                    )}

                                         {/* Brand Name */}
                     <div className="text-center mt-2 sm:mt-3">
                       <h3 className="text-xs sm:text-sm font-medium text-gray-800 group-hover:text-primary transition-colors">{brand.name}</h3>
                     </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Scroll Indicators */}
          <div className="flex justify-center mt-4 sm:mt-6 gap-2">
            {[...Array(Math.ceil(brands.length / 5))].map((_, index) => (
              <div key={index} className={`w-2 h-2 rounded-full ${index === 0 ? "bg-secondary" : "bg-muted-foreground"}`}></div>
            ))}
          </div>
        </div>

        {/* Mobile View All Button */}
        <div className="text-center mt-6 sm:mt-8 md:hidden">
          <Button variant="outline">View All</Button>
        </div>
      </div>
    </section>
  );
}
