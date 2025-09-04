"use client";

import { useState } from "react";
import Image from "next/image";
import { HiOutlinePlus, HiOutlineMinus, HiOutlineStar } from "react-icons/hi";
import { useParams } from "next/navigation";
import { useSingleProduct } from "@/app/api/productApi";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import { BeatLoader } from "react-spinners";
import { ProductDetailSkeleton } from "@/components/skeletons/product-skeleton";
import ProductReview from "@/components/products/product-review-form";

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : (params as any)?.id;
  const { addToCart, processingItems } = useCart();

  const { data: productsData, isLoading: productsIsLoading } = useSingleProduct(id);
  const product: any = productsData?.data;

  const allImages: string[] = product ? [product.imageUrl, ...(product.additionalImages?.map((img: any) => img.imageUrl) || [])].filter(Boolean) : [];

  if (productsIsLoading) {
    return (
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <ProductDetailSkeleton />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center text-gray-600">Product not found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 sm:mt-36 mt-55">
      <div key={product._id} className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12">
            {/* Product Images */}
            <div className="lg:col-span-7 flex flex-col sm:flex-row gap-3 sm:gap-6">
              <div className="flex sm:flex-col gap-2 sm:gap-3 order-2 sm:order-1">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-16 h-16 sm:w-20 sm:h-20 border-2 rounded-lg sm:rounded-xl overflow-hidden transition-all duration-200 ${
                      selectedImage === index ? "border-blue-500 shadow-lg scale-105" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Image src={image} alt={`Thumbnail ${index}`} width={80} height={80} className="object-cover w-full h-full" />
                  </button>
                ))}
              </div>

              <div className="flex-1 order-1 sm:order-2">
                <div className="aspect-square bg-gray-100 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg">
                  {allImages[selectedImage] && (
                    <Image
                      src={allImages[selectedImage]}
                      alt="Product"
                      width={600}
                      height={600}
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="lg:col-span-5 space-y-4 sm:space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">{product.productName}</h1>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">{product.description}</p>
              </div>

              {/* Reviews */}
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Image key={i} src="/images/icons/icon-star.svg" alt="star icon" width={14} height={14} />
                    ))}
                  </div>
                  <span className="text-gray-600 font-medium text-sm sm:text-base">Avg:({Number(product.averageRating || 0).toFixed(1)})</span>
                </div>
                <span className="text-gray-500 text-sm sm:text-base">Total:({product.ratingCount || 0})</span>
              </div>

              {/* Price */}
              <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Rs. {product.price}</div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <span className="text-base sm:text-lg font-semibold text-gray-900">Quantity:</span>
                <div className="flex items-center border-2 border-gray-200 rounded-lg">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 sm:px-4 sm:py-3 hover:bg-gray-50 transition-colors">
                    <HiOutlineMinus className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <span className="px-4 py-2 sm:px-6 sm:py-3 border-x-2 border-gray-200 font-semibold text-base sm:text-lg">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 sm:px-4 sm:py-3 hover:bg-gray-50 transition-colors">
                    <HiOutlinePlus className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
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
                className={`w-full py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg transition-all duration-200 ${
                  processingItems[product._id]
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700  shadow-lg hover:shadow-xl active:scale-[0.98]"
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

              {/* Reviews Section */}
              <Accordion.Root type="single" collapsible className="w-full">
                <span>({product.reviewsCount || 0} reviews)</span>
                <Accordion.Item value="cart-items" className="border-b">
                  <Accordion.Header>
                    <Accordion.Trigger className="flex justify-between items-center w-full py-2 text-left font-medium text-gray-800 hover:text-blue-600">
                      <span>Customer Reviews</span>
                      <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="mt-2 space-y-4 max-h-60 overflow-y-auto">
                    {product.reviews && product.reviews.length > 0 ? (
                      <div className="space-y-4 sm:space-y-6">
                        {product.reviews
                          .filter((review: any) => review.visibility === "public")
                          .map((review: any) => (
                            <div key={review._id} className="border border-gray-200 p-4 sm:p-6 rounded-lg sm:rounded-xl bg-gray-50">
                              <div className="flex items-center justify-between mb-2 sm:mb-3">
                                <span className="font-semibold text-gray-900 text-sm sm:text-base">{review.name}</span>
                                <span className="text-gray-500 text-xs sm:text-sm">{review.from}</span>
                              </div>
                              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{review.reviewDescription}</p>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-6 sm:py-8 text-sm sm:text-base">No reviews yet. Be the first to review this product!</p>
                    )}
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion.Root>
            </div>
          </div>
        </div>

        {/* Product Review Form placeholder - integrate when available */}
        <div className="max-w-7xl mx-auto sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
          <ProductReview productId={product._id} />
        </div>
      </div>
    </div>
  );
}
