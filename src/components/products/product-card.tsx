"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";

interface ProductCardProps {
  product: {
    _id: string;
    productName: string;
    price: number;
    discount?: number;
    imageUrl?: string;
    imgs?: {
      previews: string[];
    };
    reviewsCount?: number;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, wishlist, processingItems } = useCart();

  const isInWishlist = wishlist?.find((p) => p._id === product._id);
  const isProcessing = processingItems[product._id];

  const handleAddToCart = () => {
    addToCart(
      {
        _id: product._id,
        name: product.productName,
        price: product.price,
        image: product.imageUrl || product.imgs?.previews?.[0],
      },
      1
    );
  };

  const finalPrice = product.discount > 0 ? product.price * (1 - product.discount / 100) : product.price;

  return (
    <div className="group bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Link href={`/product/${product._id}`}>
          <Image
            src={product?.imageUrl || product.imgs?.previews?.[0] || "/images/products/product-1-sm-1.png"}
            alt={product.productName}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </Link>

        {/* Action Buttons - Show on Hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex gap-2">
            {/* Quick View */}
            <Link
              href={`/product/${product._id}`}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
              aria-label="Quick view"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </Link>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={isProcessing}
              className={`w-10 h-10 bg-blue-600 text-black bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
              aria-label="Add to cart"
            >
              {isProcessing ? (
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                  />
                </svg>
              )}
            </button>

            {/* Wishlist */}
            <button
              onClick={() => toggleWishlist(product)}
              className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-colors ${
                isInWishlist ? "bg-red-50 text-red-600 hover:bg-red-100" : "bg-white text-gray-600 hover:bg-red-50 hover:text-red-600"
              }`}
              aria-label="Add to wishlist"
            >
              <svg className="w-5 h-5" fill={isInWishlist ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Image key={i} src="/images/icons/icon-star.svg" alt="star icon" width={14} height={14} />
          ))}
          <span className="text-sm text-gray-500 ml-1">({product.reviewsCount || 0})</span>
        </div>

        {/* Product Name */}
        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
          <Link href={`/product/${product._id}`} className="hover:text-blue-600 transition-colors">
            {product.productName}
          </Link>
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-gray-900">Rs. {finalPrice.toFixed(2)}</span>
          {/* {product.discount > 0 && (
            <>
              <span className="text-sm text-gray-500 line-through">Rs. {product.price.toFixed(2)}</span>
              <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded-full">-{product.discount}%</span>
            </>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
