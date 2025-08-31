"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { HiOutlineShoppingCart, HiOutlinePlus, HiOutlineHeart, HiOutlineStar } from "react-icons/hi";
import { formatPrice } from "@/lib/utils";
import { SimpleRating } from "./simple-rating";

const truncateText = (text, maxLength = 50) => {
  if (!text) return "";
  return text.length <= maxLength ? text : text.slice(0, maxLength) + "...";
};

export default function ProductCard({ product }) {
  const { addToCart, processingItems, toggleWishlist, wishlist } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart(
      {
        _id: product._id,
        name: product.productName,
        price: product.price,
        image: product.imageUrl,
      },
      1
    );
  };

  const isProcessing = processingItems[product._id];

  return (
    <div className="group bg-white rounded shadow-sm hover:shadow transition-all duration-300 border border-gray-100 hover:border-blue-200 overflow-hidden">
      {/* Product Image Container */}
      <div className="relative aspect-[2/2] overflow-hidden bg-gray-50">
        <Link href={`/product/${product._id}`} className="block w-full h-full">
          <Image
            src={product.imageUrl || "/watch.jpg"}
            alt={product.productName}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </Link>

        {/* Discount Badge */}
        {product.discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">{product.discount}% OFF</div>
        )}

        {/* Quick Actions - Hover */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className={`w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 shadow hover:scale-105 ${
              wishlist?.find((item) => item._id === product._id) ? "text-red-500 bg-red-50" : "text-gray-600 hover:text-red-500 hover:bg-white"
            }`}
            title={wishlist?.find((item) => item._id === product._id) ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            <HiOutlineHeart className="w-4 h-4" />
          </button>

          {/* Cart */}
          <button
            onClick={handleAddToCart}
            disabled={isProcessing}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 ${
              isProcessing ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white shadow"
            }`}
            title="Add to Cart"
          >
            <HiOutlineShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-3">
        <Link href={`/product/${product._id}`} className="block group">
          <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 mb-1 text-sm">
            {truncateText(product.productName, 50)}
          </h3>
          <p className="text-gray-400 text-xs line-clamp-2">{product.description}</p>
        </Link>

        {/* Price */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1">
            {product.discount > 0 ? (
              <>
                <span className="text-sm font-bold pr-2 text-gray-900">Rs. {product.price * (1 - product.discount / 100)}</span>
                <span className="text-xs text-gray-400 line-through">Rs. {product.price}</span>
              </>
            ) : (
              <span className="text-sm font-bold text-gray-900">Rs. {product.price}</span>
            )}
          </div>
        </div>

        {/* ⭐ Rating below price */}
        <div className="flex items-center gap-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <HiOutlineStar key={i} className={`w-4 h-4 ${i < Math.floor(product.averageRating) ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
          ))}
          <span className="text-xs text-gray-500 ml-1">({product.ratingCount})</span>
        </div>
      </div>
    </div>
  );
}
