import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  icon, 
  iconPosition = 'left',
  disabled = false,
  loading = false,
  onClick,
  className = '',
  ...props 
}) => {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
    ghost: 'text-gray-600 hover:text-primary-500 hover:bg-primary-50 px-3 py-2 rounded-md transition-all duration-200',
    danger: 'bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] shadow-md hover:shadow-lg'
  };

  const sizes = {
    small: 'px-3 py-2 text-sm',
    medium: 'px-6 py-3',
    large: 'px-8 py-4 text-lg'
  };

  const baseClasses = `
    inline-flex items-center justify-center gap-2 
    font-medium transition-all duration-200 
    disabled:opacity-50 disabled:cursor-not-allowed
    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
    ${variants[variant]}
    ${variant === 'outline' || variant === 'ghost' ? sizes[size] : ''}
    ${className}
  `;

  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={baseClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <ApperIcon name="Loader2" className="w-4 h-4 animate-spin" />
      )}
      {!loading && icon && iconPosition === 'left' && (
        <ApperIcon name={icon} className="w-4 h-4" />
      )}
      {children}
      {!loading && icon && iconPosition === 'right' && (
        <ApperIcon name={icon} className="w-4 h-4" />
      )}
    </motion.button>
  );
};

export default Button;