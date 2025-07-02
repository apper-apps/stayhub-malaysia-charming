import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@/components/atoms/Button';
import LanguageToggle from '@/components/molecules/LanguageToggle';
import ApperIcon from '@/components/ApperIcon';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navigationItems = [
    { label: 'Home', path: '/' },
    { label: 'Properties', path: '/properties' },
    { label: 'Owner Dashboard', path: '/owner-dashboard' },
    { label: 'My Bookings', path: '/guest-dashboard' }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white shadow-md sticky top-0 z-40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-2 rounded-lg">
              <ApperIcon name="Home" className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-display font-bold text-xl text-gray-900">
                StayHub
              </span>
              <span className="text-primary-500 font-display font-bold text-xl ml-1">
                Malaysia
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-gray-700 hover:text-primary-500 font-medium transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <LanguageToggle className="hidden sm:flex" />
            
            <div className="hidden sm:flex items-center space-x-2">
              <Button
                variant="outline"
                size="small"
                onClick={() => navigate('/owner-dashboard')}
              >
                List Property
              </Button>
              <Button
                size="small"
                onClick={() => navigate('/properties')}
              >
                Book Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-md text-gray-700 hover:text-primary-500 hover:bg-gray-100 transition-colors duration-200"
            >
              <ApperIcon 
                name={isMobileMenuOpen ? "X" : "Menu"} 
                className="w-6 h-6" 
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-gray-200 py-4"
          >
            <div className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-primary-500 font-medium transition-colors duration-200 px-2 py-1"
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
                <LanguageToggle />
                <Button
                  variant="outline"
                  size="small"
                  onClick={() => {
                    navigate('/owner-dashboard');
                    setIsMobileMenuOpen(false);
                  }}
                  className="justify-center"
                >
                  List Property
                </Button>
                <Button
                  size="small"
                  onClick={() => {
                    navigate('/properties');
                    setIsMobileMenuOpen(false);
                  }}
                  className="justify-center"
                >
                  Book Now
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;