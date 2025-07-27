"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useGetAllProducts } from "@/app/api/productApi";
import { FaTag } from "react-icons/fa";
import Button from "@/components/ui/Button";
import { ClipLoader } from "react-spinners";

export default function ProductCategoryPage() {
  const { data: responseData, isLoading, error } = useGetAllProducts();
  const products = responseData?.data ?? [];
  const { addToCart } = useCart();

  if (isLoading) return <div className=" flex justify-center items-center h-screen"><ClipLoader/></div>;
  if (error) return <p className="text-center text-red-500">Error loading products</p>;

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-bold text-pink-600 mb-6">All Products</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white border rounded-xl shadow hover:shadow-lg transition duration-300 relative overflow-hidden"
          >
            {product.saleName && (
              <div className="absolute top-2 left-2 bg-yellow-400 text-white px-2 py-1 text-xs font-bold rounded shadow flex items-center gap-1 z-10">
                <FaTag className="text-sm" />
                {product.saleName}
              </div>
            )}

            <Image
              src={product.imageUrl}
              alt={product.productName}
              width={300}
              height={300}
              className="w-full h-48 object-cover"
            />

            <div className="p-4 space-y-1">
              <h4 className="text-lg font-semibold truncate">{product.productName}</h4>
              <p className="text-sm text-gray-500">{product.categoryName}</p>
              <p className="text-base font-bold text-gray-800">${product.price}</p>

              <Button
                onClick={() => addToCart({ ...product, quantity: 1 })}
                className="w-full mt-2 bg-pink-500 text-white py-2 rounded hover:bg-pink-600"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
