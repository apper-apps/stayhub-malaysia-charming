import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const Badge = ({ 
  children, 
  variant = 'info', 
  size = 'medium',
  icon,
  className = '' 
}) => {
  const variants = {
    success: 'badge-success',
    warning: 'badge-warning',
    error: 'badge-error',
    info: 'badge-info',
    primary: 'bg-primary-100 text-primary-800',
    secondary: 'bg-secondary-100 text-secondary-800'
  };

  const sizes = {
    small: 'px-2 py-1 text-xs',
    medium: 'px-3 py-1 text-sm',
    large: 'px-4 py-2 text-base'
  };

  return (
    <span className={`
      badge 
      ${variants[variant]} 
      ${sizes[size]}
      ${className}
    `}>
      {icon && (
        <ApperIcon name={icon} className="w-3 h-3 mr-1" />
      )}
      {children}
    </span>
  );
};

export default Badge;