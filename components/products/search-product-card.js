"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { HiOutlineShoppingCart, HiOutlinePlus, HiOutlineHeart, HiOutlineEye } from "react-icons/hi";

const truncateText = (text, maxLength = 40) => {
  if (!text) return "";
  return text.length <= maxLength ? text : text.slice(0, maxLength) + "...";
};

export default function SearchProductCard({ product }) {
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
  const isInWishlist = wishlist?.find((item) => item._id === product._id);

  return (
    <div className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-blue-200 overflow-hidden">
      {/* Product Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Link href={`/product/${product._id}`} className="block w-full h-full">
          <Image
            src={product.imageUrl || "/watch.jpg"}
            alt={product.productName}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </Link>

        {/* Discount Badge */}
        {product.discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">{product.discount}% OFF</div>
        )}

        {/* Quick Actions - Hover */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 space-y-2">
          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className={`w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:scale-110 ${
              isInWishlist ? "text-red-500 bg-red-50" : "text-gray-600 hover:text-red-500 hover:bg-white"
            }`}
            title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            <HiOutlineHeart className="w-4 h-4" />
          </button>

          {/* Quick View Button */}
          <Link
            href={`/product/${product._id}`}
            className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:scale-110 text-gray-600 hover:text-blue-600 hover:bg-white"
            title="Quick View"
          >
            <HiOutlineEye className="w-4 h-4" />
          </Link>
        </div>

        {/* Add to Cart Button - Bottom */}
        <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
          <button
            onClick={handleAddToCart}
            disabled={isProcessing}
            className={`w-full py-2 px-3 rounded-lg font-medium text-xs transition-all duration-200 ${
              isProcessing
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl active:scale-[0.98]"
            }`}
          >
            {isProcessing ? (
              <span className="flex items-center justify-center gap-1">
                <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                Adding...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-1">
                <HiOutlineShoppingCart className="w-3 h-3" />
                Add to Cart
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-3">
        {/* Product Name */}
        <Link href={`/product/${product._id}`} className="block group">
          <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 mb-2 text-sm leading-tight">
            {truncateText(product.productName, 50)}
          </h3>
        </Link>

        {/* Category */}
        {product.category?.name && (
          <div className="mb-2">
            <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">{product.category.name}</span>
          </div>
        )}

        {/* Description */}
        {product.description && <p className="text-xs text-gray-500 mb-3 line-clamp-2 leading-relaxed">{truncateText(product.description, 60)}</p>}

        {/* Price Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {product.discount > 0 ? (
              <>
                <span className="text-base font-bold text-gray-900">${(product.price * (1 - product.discount / 100)).toFixed(2)}</span>
                <span className="text-xs text-gray-400 line-through">${product.price}</span>
              </>
            ) : (
              <span className="text-base font-bold text-gray-900">${product.price}</span>
            )}
          </div>

          {/* Quick Add Button for Mobile */}
          <button
            onClick={handleAddToCart}
            disabled={isProcessing}
            className="sm:hidden w-7 h-7 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:scale-110 active:scale-95"
          >
            {isProcessing ? (
              <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <HiOutlinePlus className="w-3 h-3" />
            )}
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-2 text-xs text-gray-400 space-y-1">
          {product.colorsAvailable && product.colorsAvailable.length > 0 && <p>Colors: {product.colorsAvailable.slice(0, 3).join(", ")}</p>}
          {product.sizesAvailable && product.sizesAvailable.length > 0 && <p>Sizes: {product.sizesAvailable.slice(0, 3).join(", ")}</p>}
        </div>
      </div>
    </div>
  );
}
