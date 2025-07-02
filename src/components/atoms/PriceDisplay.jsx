import React from 'react';

const PriceDisplay = ({ 
  amount, 
  currency = 'RM', 
  size = 'medium',
  showCurrency = true,
  className = '' 
}) => {
  const sizes = {
    small: 'text-sm',
    medium: 'text-lg',
    large: 'text-2xl font-bold',
    xl: 'text-3xl font-bold'
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('ms-MY', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <span className={`
      font-display font-semibold text-primary-600
      ${sizes[size]}
      ${className}
    `}>
      {showCurrency && currency}
      {formatAmount(amount)}
    </span>
  );
};

export default PriceDisplay;