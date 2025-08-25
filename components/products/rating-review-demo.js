"use client";

import { useState } from "react";
import { ProductReview } from "./product-review-form";
import { ProductRatingDisplay } from "./product-rating-display";
import { SimpleRating, CompactRating, LargeRating } from "./simple-rating";

// Mock data for demonstration
const mockProduct = {
  _id: "demo-product-123",
  productName: "Demo Product",
  price: 2999,
  rating: 4.2,
  ratingCount: 47,
  discount: 15
};

const mockRatings = [
  { rating: 5, userId: "user1" },
  { rating: 4, userId: "user2" },
  { rating: 5, userId: "user3" },
  { rating: 3, userId: "user4" },
  { rating: 5, userId: "user5" },
  { rating: 4, userId: "user6" },
  { rating: 5, userId: "user7" },
  { rating: 4, userId: "user8" },
  { rating: 5, userId: "user9" },
  { rating: 4, userId: "user10" },
];

const mockReviews = [
  {
    name: "John Doe",
    from: "Karachi",
    summary: "Excellent product quality!",
    reviewDescription: "This product exceeded my expectations. The quality is outstanding and it's worth every penny.",
    rating: 5,
    reviewType: "positive"
  },
  {
    name: "Sarah Smith",
    from: "Lahore",
    summary: "Good but could be better",
    reviewDescription: "Overall a good product, but there are some areas that could be improved. Still recommend it.",
    rating: 4,
    reviewType: "neutral"
  },
  {
    name: "Mike Johnson",
    from: "Islamabad",
    summary: "Not what I expected",
    reviewDescription: "The product didn't meet my expectations. There were some issues with the delivery and quality.",
    rating: 3,
    reviewType: "negative"
  }
];

export function RatingReviewDemo() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Rating & Review System Demo</h1>
        <p className="text-gray-600">
          This demonstrates the complete rating and review functionality for e-commerce products.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-8">
        {[
          { id: "overview", label: "Overview", icon: "📊" },
          { id: "components", label: "Rating Components", icon: "⭐" },
          { id: "display", label: "Rating Display", icon: "📈" },
          { id: "form", label: "Review Form", icon: "✍️" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">System Overview</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Rating Features</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 5-star rating system with hover effects</li>
                  <li>• Half-star support for precise ratings</li>
                  <li>• Rating distribution visualization</li>
                  <li>• Average rating calculation</li>
                  <li>• Rating count tracking</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Review Features</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Detailed review submission</li>
                  <li>• Review type classification (positive/neutral/negative)</li>
                  <li>• User location and name tracking</li>
                  <li>• Review summary and description</li>
                  <li>• Integrated with rating system</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-medium text-gray-700 mb-4">Current Product Stats</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{mockProduct.rating}</div>
                <div className="text-sm text-blue-600">Average Rating</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{mockRatings.length}</div>
                <div className="text-sm text-green-600">Total Ratings</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{mockReviews.length}</div>
                <div className="text-sm text-purple-600">Total Reviews</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "components" && (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Rating Component Examples</h2>
            
            <div className="space-y-6">
              {/* Simple Rating */}
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Simple Rating (Default)</h3>
                <div className="space-y-2">
                  <SimpleRating rating={5} />
                  <SimpleRating rating={4.5} />
                  <SimpleRating rating={3.2} />
                  <SimpleRating rating={0} />
                </div>
              </div>

              {/* Compact Rating */}
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Compact Rating (Small)</h3>
                <div className="space-y-2">
                  <CompactRating rating={5} count={47} />
                  <CompactRating rating={4.5} count={23} />
                  <CompactRating rating={3.2} count={12} />
                </div>
              </div>

              {/* Large Rating */}
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Large Rating (Product Detail)</h3>
                <div className="space-y-2">
                  <LargeRating rating={5} count={47} />
                  <LargeRating rating={4.5} count={23} />
                  <LargeRating rating={3.2} count={12} />
                </div>
              </div>

              {/* With Count */}
              <div>
                <h3 className="font-medium text-gray-700 mb-2">With Rating Count</h3>
                <div className="space-y-2">
                  <SimpleRating rating={4.8} showCount={true} count={156} />
                  <SimpleRating rating={3.9} showCount={true} count={89} />
                  <SimpleRating rating={2.1} showCount={true} count={34} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "display" && (
        <div className="space-y-6">
          <ProductRatingDisplay 
            product={mockProduct}
            ratings={mockRatings}
            reviews={mockReviews}
          />
        </div>
      )}

      {activeTab === "form" && (
        <div className="space-y-6">
          <ProductReview productId={mockProduct._id} />
        </div>
      )}

      {/* Usage Instructions */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">How to Use</h3>
        <div className="text-sm text-blue-700 space-y-2">
          <p><strong>1. Rating Components:</strong> Use SimpleRating, CompactRating, or LargeRating for different contexts</p>
          <p><strong>2. Rating Display:</strong> Use ProductRatingDisplay to show comprehensive rating information</p>
          <p><strong>3. Review Form:</strong> Use ProductReview for user submission of ratings and reviews</p>
          <p><strong>4. Integration:</strong> All components work together and automatically update when data changes</p>
        </div>
      </div>
    </div>
  );
}
