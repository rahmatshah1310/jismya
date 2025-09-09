"use client";
import React from "react";
import { Product } from "@/types/product";
import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import Link from "next/link";

const SingleItem = ({ item }: { item: Product }) => {
  const { addToCart, toggleWishlist, wishlist, processingItems } = useCart();

  const isInWishlist = wishlist?.find((p) => p._id === item._id);
  const isProcessing = processingItems[item._id];

  const discountedPrice =
  item.discount > 0
    ? Number((item.price * (1 - item.discount / 100)).toFixed(2))
    : item.price;

  const handleAddToCart = () => {
    addToCart(
      {
        _id: item._id,
        name: item.productName,
        price: item.price,
        discount: item.discount,
        discountedPrice: discountedPrice,
        image: item.imageUrl || item.imgs?.previews?.[0],
      },
      1
    );
  };

  return (
    <div className="group">
      <div className="relative overflow-hidden rounded-lg bg-[#F6F7FB]">
        <div className="text-center px-4 py-7.5">
          {/* Rating */}
          <div className="flex items-center justify-center gap-2.5 mb-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Image key={i} src="/images/icons/icon-star.svg" alt="star icon" width={14} height={14} />
              ))}
            </div>
            <p className="text-custom-sm">({item.ratingCount})</p>
          </div>

          {/* Title */}
          <h3 className="font-medium text-dark ease-out duration-200 hover:text-blue mb-1.5">
            <Link href={`/product/${item._id}`}> {item.productName} </Link>
          </h3>

          {/* Price */}
          <span className="flex items-center justify-center gap-2 font-medium text-lg">
            <span className="text-dark">Rs. {(item.price * (1 - item.discount / 100)).toFixed(2)}</span>
            {item.discount > 0 && <span className="text-dark-4 line-through">Rs. {item.price.toFixed(2)}</span>}
          </span>
        </div>

        {/* Product Image */}
        <div className="flex justify-center items-center">
          {item.discount > 0 && (
            <div className="absolute top-2 left-2 bg-red-500  px-3 py-2 rounded-lg shadow-lg z-10">
              <div className="font-bold text-sm">{item.discount}% OFF</div>
              {item.saleName && <div className="text-xs opacity-90">{item.saleName}</div>}
            </div>
          )}
          <Image src={item?.imageUrl} alt={item.productName} width={280} height={280} className="object-cover w-full h-auto" />
        </div>

        {/* Hover Actions */}
        <div className="absolute right-0 bottom-0 translate-x-full u-w-full flex flex-col gap-2 p-5.5 ease-linear duration-300 group-hover:translate-x-0">
          {/* Quick View */}
          <Link
            href={`/product/${item._id}`}
            aria-label="button for quick view"
            id="bestOne"
            className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 ease-out duration-200 text-dark bg-white hover:text-white hover:bg-blue"
          >
            <svg className="fill-current" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.99992 5.49996C6.61921 5.49996 5.49992 6.61925 5.49992 7.99996C5.49992 9.38067 6.61921 10.5 7.99992 10.5C9.38063 10.5 10.4999 9.38067 10.4999 7.99996C10.4999 6.61925 9.38063 5.49996 7.99992 5.49996Z" />
              <path d="M7.99992 2.16663C4.9905 2.16663 2.96345 3.96942 1.78696 5.49787C0.833252 6.96854 0.833252 7.99996 1.78696 9.43436C2.96345 12.0305 4.9905 13.8333 7.99992 13.8333C11.0093 13.8333 13.0364 12.0305 14.2129 10.5021C15.1666 9.03138 15.1666 7.99996 14.2129 6.56556C13.0364 3.96942 11.0093 2.16663 7.99992 2.16663Z" />
            </svg>
          </Link>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={isProcessing}
            className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 ease-out duration-200 text-dark bg-white hover:text-white hover:bg-blue"
          >
            {isProcessing ? (
              <span className="text-xs">...</span>
            ) : (
              <svg className="fill-current" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.49 1.52C1.23 1.43 0.95 1.57 0.86 1.83C0.77 2.1 0.91 2.39 1.17 2.47L1.35 2.53C1.8 2.68 2.1 2.78 2.32 2.88C2.53 2.98 2.62 3.06 2.68 3.14C2.73 3.22 2.78 3.33 2.81 3.56V6.37C2.83 7.28 2.83 8.02 2.91 8.59C2.99 9.19 3.16 9.7 3.57 10.1C3.97 10.5 4.47 10.68 5.07 10.76C5.65 10.83 6.39 10.83 7.3 10.83H12.67C12.94 10.83 13.17 10.61 13.17 10.33C13.17 10.06 12.94 9.83 12.67 9.83H7.33C6.38 9.83 5.71 9.83 5.21 9.76C4.72 9.7 4.46 9.58 4.27 9.39L10.71 9.17C11 9.17 11.27 9.17 11.49 9.14C11.72 9.12 11.95 9.06 12.17 8.92C12.38 8.78 12.52 8.59 12.64 8.38C12.75 8.19 12.85 7.95 12.97 7.67L13.28 6.95C13.54 6.35 13.75 5.85 13.86 5.44C13.97 5.02 14 4.57 13.74 4.17C13.47 3.77 13.05 3.63 12.62 3.56H3.8L3.76 3.44C3.72 3.12 3.64 2.82 3.49 2.55C3.29 2.29 3.04 2.12 2.74 1.98C2.46 1.85 2.11 1.73 1.69 1.59L1.49 1.52Z" />
              </svg>
            )}
          </button>

          {/* Wishlist */}
          <button
            onClick={() => toggleWishlist(item)}
            aria-label="button for add to fav"
            id="addFavOne"
            className={`flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 ease-out duration-200 ${
              isInWishlist ? "text-red-500 bg-red-50" : "text-dark bg-white hover:text-white hover:bg-blue"
            }`}
          >
            <svg className="fill-current" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.75 2.95C2.64 3.46 1.83 4.66 1.83 6.09C1.83 7.56 2.43 8.69 3.29 9.65C4 10.45 4.86 11.11 5.69 11.76C6.63 12.49 6.95 12.73 7.25 12.91C7.55 13.09 7.79 13.17 8 13.17C8.21 13.17 8.45 13.09 8.75 12.91C9.05 12.73 9.37 12.49 9.72 12.21C10.11 11.91 10.31 11.76 11.14 11.11C11.9994 10.45 12.86 9.65 13.57 8.69C14.43 7.56 15.17 7.87 15.17 6.09C15.17 4.28 14.14 2.72 12.67 2.04C11.27 1.4 9.54 1.59 8 2.97C6.46 1.59 4.73 1.4 3.33 2.04C1.86 2.72 0.83 4.28 0.83 6.09C0.83 7.87 1.57 9.22 2.54 10.32C3.32 11.19 4.27 11.93 5.11 12.57C6.01 13.27 6.37 13.56 6.74 13.77C7.12 13.99 7.54 14.17 8 14.17C8.46 14.17 8.88 13.99 9.26 13.77C9.63 13.56 9.99 13.27 10.34 13C11.73 11.93 12.68 11.19 13.46 10.32C14.43 9.22 15.17 7.87 15.17 6.09C15.17 4.28 14.14 2.72 12.67 2.04C11.27 1.4 9.54 1.59 8 2.97Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleItem;
