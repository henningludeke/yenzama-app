import React from 'react';

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md';
}

const StarRating: React.FC<StarRatingProps> = ({ rating, reviewCount, size = 'sm' }) => {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {stars.map((star) => (
          <span
            key={star}
            className={`${size === 'sm' ? 'text-sm' : 'text-lg'} ${
              star <= rating ? 'text-secondary' : 'text-gray-300'
            }`}
          >
            ★
          </span>
        ))}
      </div>
      {reviewCount !== undefined && (
        <span className="text-text-secondary text-xs">({reviewCount})</span>
      )}
    </div>
  );
};

export default StarRating;
