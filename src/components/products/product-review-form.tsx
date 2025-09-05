"use client";

import { useState } from "react";
import { HiOutlineStar, HiStar } from "react-icons/hi";
import { toast } from "react-toastify";
import { useCreateReview, useCreateRating } from "@/app/api/productApi";
import { BeatLoader } from "react-spinners";

export default function ProductReview({ productId }: { productId: string | number }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [visibility, setVisibility] = useState<"public" | "private">("public");
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [reviewDescription, setReviewDescription] = useState("");

  const createRating = useCreateRating();
  const createReview = useCreateReview();

  const handleRatingSubmit = async () => {
    try {
      const res = await createRating.mutateAsync({ productId, rating });
      toast.success(res?.message || "Rating submitted successfully!");
    } catch (error: any) {
      toast.error(typeof error === "string" ? error : "Failed to submit rating.");
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await createReview.mutateAsync({
        productId: productId as string,
        name,
        from,
        reviewDescription,
        visibility,
      });
      toast.success(res?.message || "Review submitted successfully!");
      setName("");
      setFrom("");
      setReviewDescription("");
      setVisibility("public");
    } catch (error: any) {
      toast.error(typeof error === "string" ? error : "Failed to submit review.");
    }
  };

  const getRatingText = (r: number) => ["Select", "Poor", "Fair", "Good", "Very Good", "Excellent"][r] || "Select";

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="bg-white border border-gray-200 rounded-[10px] p-4 sm:p-6">
        <h2 className="text-2xl font-semibold mb-6 text-dark">Rate & Review This Product</h2>

        {/* Rating Section */}
        <div className="mb-8 p-6 bg-gray-50 rounded-[10px]">
          <h3 className="text-lg font-medium mb-4 text-dark">Rate this Product</h3>
          <div className="flex items-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => {
              const isActive = star <= (hoverRating || rating);
              return (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="w-6 h-6"
                >
                  {isActive ? (
                    <HiStar className="w-full h-full text-yellow-400" style={{ fill: "#facc15" }} />
                  ) : (
                    <HiOutlineStar className="w-full h-full text-gray-400 hover:text-yellow-400" />
                  )}
                </button>
              );
            })}

          </div>
          <p className="text-sm text-dark-4 mb-4">{rating > 0 && `${getRatingText(rating)} (${rating}/5)`}</p>
          <button
            onClick={handleRatingSubmit}
            disabled={!rating || createRating.isPending}
            className={`px-6 py-2 rounded-md font-medium ease-in duration-150 ${!rating || createRating.isPending ? "bg-gray-3 text-dark-5 cursor-not-allowed" : "bg-blue hover:bg-blue-dark text-white"
              }`}
          >
            {createRating.isPending ? <BeatLoader color="lightBlue" /> : "Submit Rating"}
          </button>
        </div>

        {/* Review Section */}
        <form onSubmit={handleReviewSubmit} className="p-6 bg-white border border-gray-200 rounded-[10px] space-y-4">
          <h3 className="text-lg font-medium mb-2 text-dark">Write a Review</h3>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full px-4 py-2 border border-gray-3 rounded-md bg-gray-1 placeholder:text-dark-5 outline-none focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
          />
          <input
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="From"
            className="w-full px-4 py-2 border border-gray-3 rounded-md bg-gray-1 placeholder:text-dark-5 outline-none focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
          />
          <textarea
            value={reviewDescription}
            onChange={(e) => setReviewDescription(e.target.value)}
            placeholder="Your Review"
            rows={4}
            className="w-full px-4 py-2 border border-gray-3 rounded-md bg-gray-1 placeholder:text-dark-5 outline-none focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={visibility === "private"}
              onChange={(e) => setVisibility(e.target.checked ? "private" : "public")}
              className="text-blue focus:ring-blue"
            />
            <span className="text-dark">Mark as private</span>
          </label>
          <button
            type="submit"
            disabled={createReview.isPending}
            className={`px-6 py-2 rounded-md font-medium ease-in duration-150 ${createReview.isPending ? "bg-gray-3 text-dark-5 cursor-not-allowed" : "bg-blue hover:bg-blue-dark text-white"
              }`}
          >
            {createReview.isPending ? <BeatLoader color="lightBlue" /> : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
}


