"use client";

import { useState } from "react";
import Image from "next/image";
import { HiOutlinePlus, HiOutlineMinus } from "react-icons/hi";
import { HiOutlineStar } from "react-icons/hi";
import { useParams } from "next/navigation";
import { useSingleProduct } from "../../api/productApi";
import ProductReview from "../../../components/products/product-review-form";
import { useCart } from "../../../context/CartContext"; //
import { BeatLoader } from "react-spinners";
import { ProductDetailSkeleton } from "../../../components/skeletons/product-skeleton";

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const { addToCart, processingItems } = useCart();

  const { data: productsData, isLoading: productsIsLoading } = useSingleProduct(id);
  const product = productsData?.data;

  const allImages = product ? [product.imageUrl, ...(product.additionalImages?.map((img) => img.imageUrl) || [])].filter(Boolean) : [];

  if (productsIsLoading) {
    return (
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8">
        <ProductDetailSkeleton/>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div key={product._id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Product Images */}
            <div className="lg:col-span-7 flex gap-6">
              <div className="flex flex-col gap-3">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 border-2 rounded-xl overflow-hidden transition-all duration-200 ${
                      selectedImage === index 
                        ? "border-blue-500 shadow-lg scale-105" 
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Image src={image} alt={`Thumbnail ${index}`} width={80} height={80} className="object-cover w-full h-full" />
                  </button>
                ))}
              </div>

              <div className="flex-1">
                <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
                  <Image src={allImages[selectedImage]} alt="Product" width={600} height={600} className="object-cover w-full h-full hover:scale-105 transition-transform duration-300" />
                </div>
              </div>
            </div>

          {/* Product Details */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.productName}</h1>
              <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
            </div>

            {/* Reviews */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <HiOutlineStar 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(product.averageRating) ? "text-yellow-400 fill-current" : "text-gray-300"}`} 
                    />
                  ))}
                </div>
                <span className="text-gray-600 font-medium">{product.averageRating.toFixed(1)}</span>
              </div>
              <span className="text-gray-500">({product.ratingCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="text-4xl font-bold text-gray-900 mb-6">Rs. {product.price}</div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-lg font-semibold text-gray-900">Quantity:</span>
              <div className="flex items-center border-2 border-gray-200 rounded-lg">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                  className="px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  <HiOutlineMinus className="w-5 h-5" />
                </button>
                <span className="px-6 py-3 border-x-2 border-gray-200 font-semibold text-lg">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)} 
                  className="px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  <HiOutlinePlus className="w-5 h-5" />
                </button>
              </div>
            </div>
            {/* Reviews Section */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>

              {product.reviews && product.reviews.length > 0 ? (
                <div className="space-y-6">
                  {product.reviews
                    .filter((review) => review.visibility === "public")
                    .map((review) => (
                      <div key={review._id} className="border border-gray-200 p-6 rounded-xl bg-gray-50">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-semibold text-gray-900">{review.name}</span>
                          <span className="text-gray-500 text-sm">{review.from}</span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{review.reviewDescription}</p>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to review this product!</p>
              )}
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={() =>
                addToCart(
                  {
                    _id: product._id,
                    name: product.productName,
                    price: product.price,
                    image: product.imageUrl,
                  },
                  quantity
                )
              }
              disabled={processingItems[product._id]}
              className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 ${
                processingItems[product._id] 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl active:scale-[0.98]"
              }`}
            >
              {processingItems[product._id] ? (
                <div className="flex items-center justify-center gap-2">
                  <BeatLoader color="white" size={8} />
                  <span>Adding to Cart...</span>
                </div>
              ) : (
                "Add to Cart"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Product Review Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProductReview productId={product._id} />
      </div>
    </div>
    </div>
  );
}
