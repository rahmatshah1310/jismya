"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HiOutlineStar, HiOutlineThumbUp, HiOutlineThumbDown } from "react-icons/hi";
import { toast } from "react-toastify";
import { useCreateReview, useCreateRating } from "../../app/api/productApi";
import { BeatLoader } from "react-spinners";

export default function ProductReview({ productId }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [visibility, setVisibility] = useState("public");
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [reviewDescription, setReviewDescription] = useState("");

  const createRating = useCreateRating();
  const createReview = useCreateReview();

  const handleRatingSubmit = async () => {
    try {
      const res = await createRating.mutateAsync({ productId, rating });
      toast.success(res?.message || "Rating submitted successfully!");
    } catch (error) {
      console.error("Rating submission error:", error);
      toast.error(typeof error === "string" ? error : "Failed to submit rating.");
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createReview.mutateAsync({
        productId,
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
    } catch (error) {
      console.error("Review submission error:", error);
      toast.error(typeof error === "string" ? error : "Failed to submit review.");
    }
  };

  const getRatingText = (r) => ["Select", "Poor", "Fair", "Good", "Very Good", "Excellent"][r] || "Select";

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="bg-white border border-gray-200 rounded-lg p-2 sm:p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Rate & Review This Product</h2>

        {/* Rating Section */}
        <div className="mb-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium mb-4 text-gray-700">Rate this Product</h3>
          <div className="flex items-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className={`w-10 h-10 transition-all duration-200 ${
                  star <= (hoverRating || rating) ? "text-yellow-400 scale-110" : "text-gray-300 hover:text-yellow-400"
                }`}
              >
                <HiOutlineStar className="w-full h-full fill-current" />
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-600 mb-4">{rating > 0 && `${getRatingText(rating)} (${rating}/5)`}</p>
          <button
            onClick={handleRatingSubmit}
            disabled={!rating || createRating.isPending}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              !rating || createRating.isLoading ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {createRating.isPending ? <BeatLoader color="lightBlue" /> : "Submit Rating"}
          </button>
        </div>

        {/* Review Section */}
        <form onSubmit={handleReviewSubmit} className="p-6 bg-white border border-gray-200 rounded-lg space-y-4">
          <h3 className="text-lg font-medium mb-4 text-gray-700">Write a Review</h3>
          {/* Name */}
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="w-full px-3 py-2 border rounded-lg" />
          {/* From */}
          <input type="text" value={from} onChange={(e) => setFrom(e.target.value)} placeholder="From" className="w-full px-3 py-2 border rounded-lg" />
          {/* Description */}
          <textarea
            value={reviewDescription}
            onChange={(e) => setReviewDescription(e.target.value)}
            placeholder="Your Review"
            rows={4}
            className="w-full px-3 py-2 border rounded-lg"
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={visibility === "private"}
              onChange={(e) => setVisibility(e.target.checked ? "private" : "public")}
              className="text-blue-600 focus:ring-blue-500"
            />
            <span>Mark as private</span>
          </label>
          <button
            type="submit"
            disabled={createReview.isPending}
            className={`px-6 py-2 rounded-lg font-medium ${
              createReview.isLoading ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {createReview.isPending ? <BeatLoader color="lightBlue" /> : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
}
