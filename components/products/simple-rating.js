"use client";

import { HiOutlineStar } from "react-icons/hi";

export function SimpleRating({ rating, showCount = false, count = 0, size = "w-4 h-4", className = "" }) {
  if (!rating || rating === 0) {
    return (
      <div className={`flex items-center gap-1 ${className}`}>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <HiOutlineStar key={i} className={`${size} text-gray-300`} />
          ))}
        </div>
        {showCount && count > 0 && (
          <span className="text-xs text-gray-500">({count})</span>
        )}
      </div>
    );
  }

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex">
        {/* Full stars */}
        {[...Array(fullStars)].map((_, i) => (
          <HiOutlineStar key={i} className={`${size} text-yellow-400 fill-current`} />
        ))}
        
        {/* Half star */}
        {hasHalfStar && (
          <div className="relative">
            <HiOutlineStar className={`${size} text-gray-300`} />
            <div className="absolute inset-0 overflow-hidden">
              <HiOutlineStar className={`${size} text-yellow-400 fill-current`} style={{ clipPath: 'inset(0 50% 0 0)' }} />
            </div>
          </div>
        )}
        
        {/* Empty stars */}
        {[...Array(emptyStars)].map((_, i) => (
          <HiOutlineStar key={i + fullStars + (hasHalfStar ? 1 : 0)} className={`${size} text-gray-300`} />
        ))}
      </div>
      
      {showCount && count > 0 && (
        <span className="text-xs text-gray-500">({count})</span>
      )}
    </div>
  );
}

// Compact version for small spaces
export function CompactRating({ rating, count = 0, className = "" }) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <SimpleRating rating={rating} size="w-3 h-3" />
      {count > 0 && (
        <span className="text-xs text-gray-500">({count})</span>
      )}
    </div>
  );
}

// Large version for product detail pages
export function LargeRating({ rating, count = 0, showText = true, className = "" }) {
  const getRatingText = (rating) => {
    if (rating >= 4.5) return "Excellent";
    if (rating >= 4.0) return "Very Good";
    if (rating >= 3.5) return "Good";
    if (rating >= 3.0) return "Fair";
    if (rating >= 2.0) return "Poor";
    return "Very Poor";
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex items-center gap-2">
        <SimpleRating rating={rating} size="w-6 h-6" />
        <span className="text-lg font-semibold text-gray-800">{rating}</span>
      </div>
      
      {showText && (
        <span className="text-sm text-gray-600">{getRatingText(rating)}</span>
      )}
      
      {count > 0 && (
        <span className="text-sm text-gray-500">• {count} ratings</span>
      )}
    </div>
  );
}
