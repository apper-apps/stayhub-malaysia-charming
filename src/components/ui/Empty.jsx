import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const Empty = ({ 
  icon = "Search",
  title = "No results found",
  description = "We couldn't find what you're looking for.",
  actionLabel = "Try again",
  onAction,
  className = '' 
}) => {
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
      <div className="bg-gradient-to-br from-primary-50 to-secondary-50 p-6 rounded-full mb-6">
        <ApperIcon name={icon} className="w-12 h-12 text-primary-500" />
      </div>
      
      <h3 className="font-display font-semibold text-xl text-gray-900 mb-2">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md">
        {description}
      </p>
      
      {onAction && (
        <Button onClick={onAction} icon="ArrowRight">
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
};

export default Empty;