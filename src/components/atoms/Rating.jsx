import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const Rating = ({ 
  rating = 0, 
  maxRating = 5, 
  size = 'medium',
  showNumber = true,
  className = '' 
}) => {
  const sizes = {
    small: 'w-3 h-3',
    medium: 'w-4 h-4',
    large: 'w-5 h-5'
  };

  const textSizes = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base'
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <ApperIcon
          key={i}
          name="Star"
          className={`${sizes[size]} text-accent-500 fill-current`}
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <ApperIcon
          key="half"
          name="Star"
          className={`${sizes[size]} text-accent-500 fill-current opacity-50`}
        />
      );
    }

    const remainingStars = maxRating - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <ApperIcon
          key={`empty-${i}`}
          name="Star"
          className={`${sizes[size]} text-gray-300`}
        />
      );
    }

    return stars;
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex items-center">
        {renderStars()}
      </div>
      {showNumber && (
        <span className={`text-gray-600 font-medium ${textSizes[size]}`}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default Rating;