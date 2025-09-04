"use client";

import React from "react";
import Link from "next/link";
import ProductItem from "@/components/Common/ProductItem";
import { useGetAllProducts } from "@/app/api/productApi";
import { ProductGridSkeleton } from "@/components/skeletons/product-skeleton";

const NewArrival = () => {
  const { data: products, isLoading, error } = useGetAllProducts();

  if (isLoading)
    return (
      <div className="max-w-7xl sm:px-10 px-2 mx-auto">
        <ProductGridSkeleton />
      </div>
    );
  if (error || !products?.data || products.data.length === 0) return <div>No products found</div>;

  // ✅ Sort products by createdAt (latest first)
  const sortedProducts = [...products.data].sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // ✅ Take only the latest 8 products (you can adjust the number)
  const latestProducts = sortedProducts.slice(0, 8);

  return (
    <section className="overflow-hidden pt-15">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        {/* Section title */}
        <div className="mb-7 flex items-center justify-between">
          <div>
            <span className="flex items-center gap-2.5 font-medium text-dark mb-1.5">
              {/* SVG Icon */}
              This Week’s
            </span>
            <h2 className="font-semibold text-xl xl:text-heading-5 text-dark">New Arrivals</h2>
          </div>

          <Link
            href="/shop-without-sidebar"
            className="inline-flex font-medium text-custom-sm py-2.5 px-7 rounded-md border-gray-3 border bg-gray-1 text-dark ease-out duration-200 hover:bg-dark hover:text-white hover:border-transparent"
          >
            View All
          </Link>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7.5">
          {latestProducts.map((item: any, key: number) => (
            <ProductItem item={item} key={key} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrival;
