"use client";

import { useState } from "react";
import Image from "next/image";
import { HiOutlinePlus, HiOutlineMinus } from "react-icons/hi";
import { HiOutlineStar } from "react-icons/hi";
import { useParams } from "next/navigation";
import { useSingleProduct } from "../../api/productApi";
import ProductReview from "../../../components/products/product-review-form";
import { useCart } from "../../../context/CartContext"; //
import { BeatLoader } from "react-spinners"

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const { addToCart, processingItems } = useCart();

  const { data: productsData, isLoading: productsIsLoading } = useSingleProduct(id);
  const product = productsData?.data;
  console.log(product, "product............")

  const allImages = product ? [product.imageUrl, ...(product.additionalImages?.map((img) => img.imageUrl) || [])].filter(Boolean) : [];

  if (productsIsLoading) {
    return <div className="w-full h-full flex justify-center"><BeatLoader color="lightBlue" /></div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <div key={product._id} className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Product Images */}
          <div className="lg:col-span-6 flex gap-4">
            <div className="flex flex-col gap-2">
              {allImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 border-2 rounded-lg overflow-hidden ${selectedImage === index ? "border-blue-500" : "border-gray-200"}`}
                >
                  <Image src={image} alt={`Thumbnail ${index}`} width={80} height={80} className="object-cover w-full h-full" />
                </button>
              ))}
            </div>

            <div className="flex-1">
              <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                <Image src={allImages[selectedImage]} alt="Product" width={500} height={500} className="object-cover w-full h-full" />
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:col-span-4 space-y-4">
            <h1 className="text-2xl font-bold">{product.productName}</h1>
            <p className="text-gray-600">{product.description}</p>

            {/* Reviews */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex gap-x-2 items-center">
              <span className="text-gray-600 ml-2">{product.averageRating.toFixed(1)} / 5</span>
                <HiOutlineStar
                  className={`w-5 h-5 ${product.averageRating ? "text-yellow-400" : "text-gray-300"}`}
                />
              </div>
              <div>{product.ratingCount}Total Rating</div>
            </div>

            {/* Price */}
            <div className="text-3xl font-bold">Rs.{product.price}</div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center border rounded-lg">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-gray-50">
                  <HiOutlineMinus />
                </button>
                <span className="px-4 py-2 border-x">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 hover:bg-gray-50">
                  <HiOutlinePlus />
                </button>
              </div>
            </div>
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Reviews</h2>

              {product.reviews && product.reviews.length > 0 ? (
                <div className="space-y-4">
                  {product.reviews
                    .filter((review) => review.visibility === "public") // show only public
                    .map((review) => (
                      <div key={review._id} className="border p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold">{review.name}</span>
                          <span className="text-gray-500 text-sm">{review.from}</span>
                        </div>
                        <p className="text-gray-700">{review.reviewDescription}</p>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-gray-500">No reviews yet.</p>
              )}
            </div>

            <button
              onClick={() =>
                addToCart(
                  {
                    _id: product._id,
                    name: product.productName,
                    price: product.price,
                    image: product.imageUrl,
                  },
                  1
                )
              }
              disabled={processingItems[product._id]}
              className={`w-full py-3 px-6 rounded-lg font-semibold text-lg ${processingItems[product._id] ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
            >
              {processingItems[product._id] ? <BeatLoader color="lightBlue" /> : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>

      {/* Product Review */}
      <ProductReview productId={product._id} />
    </div>
  );
}
