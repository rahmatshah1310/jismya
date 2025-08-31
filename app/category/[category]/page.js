"use client";

import { useParams } from "next/navigation";
import { ProductGrid } from "@/components/products/product-grid";

export default function CategoryPage() {
  const { category } = useParams();

  return (
    <div className="min-h-screen bg-gray-50">
      <ProductGrid categoryId={category} />
    </div>
  );
}
