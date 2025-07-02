import React from 'react';
import { motion } from 'framer-motion';

const Loading = ({ type = 'properties' }) => {
  const renderPropertySkeleton = () => (
    <div className="card overflow-hidden">
      {/* Image skeleton */}
      <div className="h-48 md:h-56 bg-gray-200 shimmer"></div>
      
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        <div className="h-6 bg-gray-200 rounded shimmer"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 shimmer"></div>
        <div className="h-16 bg-gray-200 rounded shimmer"></div>
        
        <div className="flex gap-2">
          <div className="h-6 bg-gray-200 rounded w-16 shimmer"></div>
          <div className="h-6 bg-gray-200 rounded w-16 shimmer"></div>
          <div className="h-6 bg-gray-200 rounded w-16 shimmer"></div>
        </div>
        
        <div className="flex justify-between items-center pt-2">
          <div className="h-4 bg-gray-200 rounded w-20 shimmer"></div>
          <div className="h-8 bg-gray-200 rounded w-24 shimmer"></div>
        </div>
      </div>
    </div>
  );

  const renderBookingSkeleton = () => (
    <div className="card">
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-2 flex-1">
            <div className="h-6 bg-gray-200 rounded w-3/4 shimmer"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 shimmer"></div>
          </div>
          <div className="h-6 bg-gray-200 rounded w-20 shimmer"></div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="h-3 bg-gray-200 rounded w-16 shimmer"></div>
            <div className="h-5 bg-gray-200 rounded w-24 shimmer"></div>
          </div>
          <div className="space-y-1">
            <div className="h-3 bg-gray-200 rounded w-16 shimmer"></div>
            <div className="h-5 bg-gray-200 rounded w-24 shimmer"></div>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <div className="flex justify-between items-center">
            <div className="h-4 bg-gray-200 rounded w-32 shimmer"></div>
            <div className="flex gap-2">
              <div className="h-8 bg-gray-200 rounded w-20 shimmer"></div>
              <div className="h-8 bg-gray-200 rounded w-16 shimmer"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCalendarSkeleton = () => (
    <div className="bg-white rounded-xl shadow-card p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="h-6 bg-gray-200 rounded w-32 shimmer"></div>
        <div className="flex gap-2">
          <div className="h-8 w-8 bg-gray-200 rounded shimmer"></div>
          <div className="h-8 w-32 bg-gray-200 rounded shimmer"></div>
          <div className="h-8 w-8 bg-gray-200 rounded shimmer"></div>
        </div>
      </div>
      
      <div className="calendar-grid gap-1 mb-4">
        {Array(42).fill(null).map((_, index) => (
          <div key={index} className="aspect-square bg-gray-200 rounded shimmer"></div>
        ))}
      </div>
      
      <div className="h-12 bg-gray-200 rounded shimmer"></div>
    </div>
  );

  const getSkeletonContent = () => {
    switch (type) {
      case 'properties':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array(8).fill(null).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {renderPropertySkeleton()}
              </motion.div>
            ))}
          </div>
        );
      
      case 'bookings':
        return (
          <div className="space-y-4">
            {Array(5).fill(null).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {renderBookingSkeleton()}
              </motion.div>
            ))}
          </div>
        );
      
      case 'calendar':
        return renderCalendarSkeleton();
      
      default:
        return (
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3 shimmer"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 shimmer"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 shimmer"></div>
          </div>
        );
    }
  };

  return (
    <div className="animate-pulse">
      {getSkeletonContent()}
    </div>
  );
};

export default Loading;