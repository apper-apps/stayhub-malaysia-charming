import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import PropertyGrid from '@/components/organisms/PropertyGrid';
import FilterPanel from '@/components/molecules/FilterPanel';
import SearchBar from '@/components/molecules/SearchBar';
import Button from '@/components/atoms/Button';
import Select from '@/components/atoms/Select';
import ApperIcon from '@/components/ApperIcon';
import { propertyService } from '@/services/api/propertyService';

const PropertiesPage = () => {
  const location = useLocation();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  // Extract search data from navigation state
  const searchData = location.state?.searchData;

  useEffect(() => {
    loadProperties();
  }, []);

  useEffect(() => {
    applyInitialFilters();
  }, [properties, searchData]);

  const loadProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await propertyService.getAll();
      setProperties(data);
    } catch (err) {
      console.error('Error loading properties:', err);
      setError('Failed to load properties. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const applyInitialFilters = () => {
    let filtered = [...properties];

    // Apply search filters if coming from search
    if (searchData) {
      if (searchData.location) {
        filtered = filtered.filter(property =>
          property.location.city.toLowerCase().includes(searchData.location.toLowerCase()) ||
          property.location.state.toLowerCase().includes(searchData.location.toLowerCase()) ||
          property.name.toLowerCase().includes(searchData.location.toLowerCase())
        );
      }

      if (searchData.guests) {
        filtered = filtered.filter(property =>
          property.maxGuests >= parseInt(searchData.guests)
        );
      }
    }

    setFilteredProperties(filtered);
  };

  const handleSearch = (newSearchData) => {
    let filtered = [...properties];

    if (newSearchData.location) {
      filtered = filtered.filter(property =>
        property.location.city.toLowerCase().includes(newSearchData.location.toLowerCase()) ||
        property.location.state.toLowerCase().includes(newSearchData.location.toLowerCase()) ||
        property.name.toLowerCase().includes(newSearchData.location.toLowerCase())
      );
    }

    if (newSearchData.guests) {
      filtered = filtered.filter(property =>
        property.maxGuests >= parseInt(newSearchData.guests)
      );
    }

    setFilteredProperties(filtered);
  };

  const handleApplyFilters = (filters) => {
    let filtered = [...properties];

    // Price range filter
    if (filters.priceMin) {
      filtered = filtered.filter(property =>
        property.pricing.basePrice >= parseInt(filters.priceMin)
      );
    }
    if (filters.priceMax) {
      filtered = filtered.filter(property =>
        property.pricing.basePrice <= parseInt(filters.priceMax)
      );
    }

    // Guests filter
    if (filters.guests) {
      filtered = filtered.filter(property =>
        property.maxGuests >= parseInt(filters.guests)
      );
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(property =>
        property.location.city.toLowerCase().includes(filters.location.toLowerCase()) ||
        property.location.state.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Amenities filter
    if (filters.amenities.length > 0) {
      filtered = filtered.filter(property =>
        filters.amenities.every(amenity =>
          property.amenities.includes(amenity)
        )
      );
    }

    setFilteredProperties(filtered);
    setShowFilters(false);
  };

  const handleClearFilters = () => {
    setFilteredProperties(properties);
  };

  const handleSort = (value) => {
    setSortBy(value);
    let sorted = [...filteredProperties];

    switch (value) {
      case 'price-low':
        sorted.sort((a, b) => a.pricing.basePrice - b.pricing.basePrice);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.pricing.basePrice - a.pricing.basePrice);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        // Featured - keep original order
        break;
    }

    setFilteredProperties(sorted);
  };

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' }
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="font-display font-bold text-3xl md:text-4xl text-gray-900 mb-4">
          Discover Perfect Homestays
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our collection of verified homestays across Malaysia. Find the perfect accommodation for your next adventure.
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <SearchBar onSearch={handleSearch} />
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row justify-between items-center gap-4"
      >
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            icon="Filter"
            className="lg:hidden"
          >
            Filters
          </Button>
          <p className="text-gray-600">
            {filteredProperties.length} properties found
          </p>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Sort by:</span>
          <Select
            value={sortBy}
            onChange={(e) => handleSort(e.target.value)}
            options={sortOptions}
            className="w-48"
          />
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className={`
            lg:w-80 lg:sticky lg:top-24 lg:self-start
            ${showFilters ? 'block' : 'hidden lg:block'}
          `}
        >
          <FilterPanel
            onApplyFilters={handleApplyFilters}
            onClearFilters={handleClearFilters}
          />
        </motion.div>

        {/* Properties Grid */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="flex-1"
        >
          <PropertyGrid
            properties={filteredProperties}
            loading={loading}
            error={error}
            onRetry={loadProperties}
          />
        </motion.div>
      </div>

      {/* Mobile Filter Modal Overlay */}
      {showFilters && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-semibold text-lg">Filters</h3>
              <Button
                variant="ghost"
                size="small"
                onClick={() => setShowFilters(false)}
              >
                <ApperIcon name="X" className="w-5 h-5" />
              </Button>
            </div>
            <div className="p-4">
              <FilterPanel
                onApplyFilters={handleApplyFilters}
                onClearFilters={handleClearFilters}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertiesPage;