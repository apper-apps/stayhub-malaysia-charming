import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const Error = ({ 
  message = "Something went wrong", 
  onRetry,
  className = '' 
}) => {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        flex flex-col items-center justify-center 
        min-h-[400px] text-center p-8
        ${className}
      `}
    >
      <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-full mb-6">
        <ApperIcon name="AlertTriangle" className="w-12 h-12 text-red-500" />
      </div>
      
      <h3 className="font-display font-semibold text-xl text-gray-900 mb-2">
        Oops! Something went wrong
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md">
        {message}. Please try again or contact support if the problem persists.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Button onClick={handleRetry} icon="RotateCcw">
          Try Again
        </Button>
        <Button 
          variant="outline" 
          onClick={() => window.location.href = '/'}
        >
          Go Home
        </Button>
      </div>
    </motion.div>
  );
};

export default Error;