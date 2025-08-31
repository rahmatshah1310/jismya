"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export function PopularCategories() {
  const categories = [
    { name: "Health & Beauty", icon: "💄", href: "/category/health-beauty" },
    { name: "Electronics", icon: "💻", href: "/category/electronics" },
    { name: "Fashion", icon: "👕", href: "/category/fashion" },
    { name: "Home & Living", icon: "🏠", href: "/category/home-living" },
    { name: "Sports", icon: "⚽", href: "/category/sports" },
    { name: "Books", icon: "📚", href: "/category/books" },
  ];

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800">Popular Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((category) => (
            <Link key={category.name} href={category.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-white">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3">{category.icon}</div>
                  <h3 className="font-semibold text-sm sm:text-base text-gray-800">{category.name}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
