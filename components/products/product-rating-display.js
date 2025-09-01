"use client";

import { HiOutlineStar } from "react-icons/hi";

export function ProductRatingDisplay({ ratings = [], reviews = [] }) {
  // Calculate average rating
  const averageRating = ratings.length > 0 ? ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratings.length : 0;

  const roundedRating = Math.round(averageRating * 10) / 10;

  // Rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => {
    const count = ratings.filter((r) => r.rating === star).length;
    const percentage = ratings.length > 0 ? (count / ratings.length) * 100 : 0;
    return { star, count, percentage };
  });

  // Get rating text
  const getRatingText = (rating) => {
    if (rating >= 4.5) return "Excellent";
    if (rating >= 4.0) return "Very Good";
    if (rating >= 3.5) return "Good";
    if (rating >= 3.0) return "Fair";
    if (rating >= 2.0) return "Poor";
    return "Very Poor";
  };

  // Render star rating
  const renderStars = (rating, size = "w-4 h-4") => {
    return [...Array(5)].map((_, i) => (
      <HiOutlineStar
        key={i}
        className={`${size} ${
          i < Math.floor(rating) ? "text-yellow-400 fill-current" : rating - i >= 0.5 ? "text-yellow-400 fill-current opacity-70" : "text-gray-300"
        }`}
      />
    ));
  };

  if (ratings.length === 0 && reviews.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Customer Ratings & Reviews</h3>
        <p className="text-gray-500 text-center py-8">No ratings or reviews yet. Be the first to rate this product!</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-6 text-gray-800">Customer Ratings & Reviews</h3>

      {/* Overall Rating Summary */}
      <div className="flex items-start gap-6 mb-8 p-6 bg-gray-50 rounded-lg">
        {/* Average Rating */}
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-800 mb-2">{roundedRating}</div>
          <div className="flex justify-center mb-2">{renderStars(roundedRating, "w-6 h-6")}</div>
          <div className="text-sm text-gray-600 mb-1">{getRatingText(roundedRating)}</div>
          <div className="text-xs text-gray-500">{ratings.length} ratings</div>
        </div>

        {/* Rating Distribution */}
        <div className="flex-1">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Rating Distribution</h4>
          <div className="space-y-2">
            {ratingDistribution.map(({ star, count, percentage }) => (
              <div key={star} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-12">
                  <span className="text-xs text-gray-600">{star}</span>
                  <HiOutlineStar className="w-3 h-3 text-yellow-400 fill-current" />
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-400 h-2 rounded-full transition-all duration-300" style={{ width: `${percentage}%` }} />
                </div>
                <div className="text-xs text-gray-600 w-12 text-right">{count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Individual Reviews */}
      {reviews.length > 0 && (
        <div>
          <h4 className="text-lg font-medium mb-4 text-gray-800">Customer Reviews</h4>
          <div className="space-y-4">
            {reviews.slice(0, 5).map((review, index) => (
              <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="flex">{renderStars(review.rating)}</div>
                    <span className="text-sm text-gray-600">({review.rating}/5)</span>
                  </div>
                  <div className="text-xs text-gray-500">{review.from && `from ${review.from}`}</div>
                </div>

                <div className="mb-2">
                  <h5 className="font-medium text-gray-800 mb-1">{review.summary}</h5>
                  <p className="text-sm text-gray-600">{review.reviewDescription}</p>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="font-medium">{review.name}</span>
                  {review.reviewType && (
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        review.reviewType === "positive"
                          ? "bg-blue-100 text-blue-700"
                          : review.reviewType === "negative"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {review.reviewType}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {reviews.length > 5 && (
            <div className="text-center mt-4">
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All {reviews.length} Reviews</button>
            </div>
          )}
        </div>
      )}

      {/* Quick Rating Stats */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="text-blue-800">
            <strong>{ratings.length}</strong> customers rated this product
          </span>
          <span className="text-blue-600">
            Average: <strong>{roundedRating}/5</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
