"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "../../context/CartContext";
import { HiOutlineShoppingCart, HiOutlinePlus, HiOutlineHeart } from "react-icons/hi";
import { formatPrice } from "../../lib/utils";
import { SimpleRating } from "./simple-rating";

const truncateText = (text, maxLength = 50) => {
  if (!text) return "";
  return text.length <= maxLength ? text : text.slice(0, maxLength) + "...";
};

export default function ProductCard({ product }) {
  const { addToCart, processingItems } = useCart();

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
    <div className="group bg-white dark:bg-d-card rounded-2xl shadow-card hover:shadow-hover transition-all duration-300 border border-border dark:border-d-border hover:border-brand/30 dark:hover:border-brand/30 overflow-hidden animate-fade-in">
      {/* Product Image Container */}
      <div className="relative aspect-square overflow-hidden bg-sand/30 dark:bg-white/5">
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
          <div className="absolute top-3 left-3 bg-brand text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-soft animate-scale-in">{product.discount}% OFF</div>
        )}

        {/* Quick Actions - Hover */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button className="w-8 h-8 bg-white/90 dark:bg-d-card/90 backdrop-blur-sm rounded-full flex items-center justify-center text-ink dark:text-d-ink hover:text-rose hover:bg-white dark:hover:bg-d-card transition-all duration-200 shadow-soft hover:scale-110">
            <HiOutlineHeart className="w-4 h-4" />
          </button>
        </div>

        {/* Add to Cart Button - Bottom */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
          <button
            onClick={handleAddToCart}
            disabled={isProcessing}
            className={`w-full py-2 px-3 rounded-xl font-medium text-sm transition-all duration-200 ${
              isProcessing 
                ? "bg-sand/60 dark:bg-white/20 text-ink/50 dark:text-d-ink/50 cursor-not-allowed" 
                : "bg-brand hover:bg-brand-600 text-white shadow-card hover:shadow-hover active:scale-[0.99]"
            }`}
          >
            {isProcessing ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-ink/30 dark:border-d-ink/30 border-t-transparent rounded-full animate-spin"></div>
                Adding...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <HiOutlineShoppingCart className="w-4 h-4" />
                Add to Cart
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4">
        {/* Product Name */}
        <Link href={`/product/${product._id}`} className="block group">
          <h3 className="font-medium text-ink dark:text-d-ink group-hover:text-brand dark:group-hover:text-brand transition-colors duration-200 line-clamp-2 mb-2">{truncateText(product.productName, 60)}</h3>
        </Link>

        {/* Rating */}
        {product.rating && (
          <div className="mb-2">
            <SimpleRating rating={product.rating} showCount={true} count={product.ratingCount || 0} size="w-3 h-3" />
          </div>
        )}

        {/* Additional Info */}
        <div className="text-xs text-ink/60 dark:text-d-ink/60 space-y-1 mb-3">
          {product.brand && <p className="font-medium text-ink/80 dark:text-d-ink/80">{product.brand}</p>}
          {product.category.name && <p className="capitalize">{product.category.name}</p>}
        </div>

        {/* Price Section */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {product.discount > 0 ? (
              <>
                <span className="text-lg font-bold text-ink dark:text-d-ink">{formatPrice(product.price * (1 - product.discount / 100))}</span>
                <span className="text-sm text-ink/50 dark:text-d-ink/50 line-through">{formatPrice(product.price)}</span>
              </>
            ) : (
              <span className="text-lg font-bold text-ink dark:text-d-ink">{formatPrice(product.price)}</span>
            )}
          </div>

          {/* Quick Add Button for Mobile */}
          <button
            onClick={handleAddToCart}
            disabled={isProcessing}
            className="sm:hidden w-8 h-8 bg-brand hover:bg-brand-600 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-soft hover:scale-110 active:scale-95"
          >
            {isProcessing ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <HiOutlinePlus className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
