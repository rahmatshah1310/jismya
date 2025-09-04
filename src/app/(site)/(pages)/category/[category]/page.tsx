"use client";

import { useParams } from "next/navigation";
import React from "react";
import { ProductGrid } from "@/components/products/product-grid";

export default function CategoryPage() {
  const params = useParams();
  const categoryId = Array.isArray(params?.category) ? params.category[0] : (params as any)?.category;

  return (
    <main className="sm:mt-36">
      <ProductGrid categoryId={categoryId} />
    </main>
  );
}


