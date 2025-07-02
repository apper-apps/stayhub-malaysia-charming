import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const LanguageToggle = ({ className = '' }) => {
  const [currentLanguage, setCurrentLanguage] = useState('EN');

  const languages = [
    { code: 'EN', label: 'English', flag: '🇺🇸' },
    { code: 'BM', label: 'Bahasa Malaysia', flag: '🇲🇾' }
  ];

  const toggleLanguage = () => {
    setCurrentLanguage(prev => prev === 'EN' ? 'BM' : 'EN');
  };

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      className={`
        flex items-center gap-2 px-3 py-2 rounded-lg
        bg-white hover:bg-gray-50 border border-gray-200
        text-sm font-medium text-gray-700 transition-all duration-200
        ${className}
      `}
    >
      <span className="text-base">{currentLang.flag}</span>
      <span>{currentLang.code}</span>
      <ApperIcon name="ChevronDown" className="w-3 h-3" />
    </motion.button>
  );
};

export default LanguageToggle;