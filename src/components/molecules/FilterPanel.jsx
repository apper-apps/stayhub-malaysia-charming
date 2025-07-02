import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import ApperIcon from '@/components/ApperIcon';

const FilterPanel = ({ onApplyFilters, onClearFilters, className = '' }) => {
  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    guests: '',
    location: '',
    amenities: []
  });

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAmenityToggle = (amenity) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
  };

  const handleClear = () => {
    const clearFilters = {
      priceMin: '',
      priceMax: '',
      guests: '',
      location: '',
      amenities: []
    };
    setFilters(clearFilters);
    onClearFilters();
  };

  const guestOptions = [
    { value: '', label: 'Any number of guests' },
    { value: '1', label: '1 Guest' },
    { value: '2', label: '2 Guests' },
    { value: '3', label: '3 Guests' },
    { value: '4', label: '4 Guests' },
    { value: '5', label: '5+ Guests' }
  ];

  const popularAmenities = [
    'WiFi', 'Air Conditioning', 'Kitchen', 'Parking', 'Pool', 'BBQ'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`bg-white rounded-xl shadow-card p-6 ${className}`}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display font-semibold text-lg">Filters</h3>
        <Button variant="ghost" onClick={handleClear} size="small">
          Clear All
        </Button>
      </div>

      <div className="space-y-6">
        {/* Price Range */}
        <div>
          <h4 className="font-medium mb-3">Price Range (per night)</h4>
          <div className="grid grid-cols-2 gap-3">
            <Input
              placeholder="Min price"
              value={filters.priceMin}
              onChange={(e) => handleFilterChange('priceMin', e.target.value)}
              type="number"
            />
            <Input
              placeholder="Max price"
              value={filters.priceMax}
              onChange={(e) => handleFilterChange('priceMax', e.target.value)}
              type="number"
            />
          </div>
        </div>

        {/* Guests */}
        <div>
          <h4 className="font-medium mb-3">Number of Guests</h4>
          <Select
            value={filters.guests}
            onChange={(e) => handleFilterChange('guests', e.target.value)}
            options={guestOptions}
          />
        </div>

        {/* Location */}
        <div>
          <h4 className="font-medium mb-3">Location</h4>
          <Input
            placeholder="Enter city or state"
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            icon="MapPin"
          />
        </div>

        {/* Amenities */}
        <div>
          <h4 className="font-medium mb-3">Amenities</h4>
          <div className="space-y-2">
            {popularAmenities.map((amenity) => (
              <label key={amenity} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.amenities.includes(amenity)}
                  onChange={() => handleAmenityToggle(amenity)}
                  className="sr-only"
                />
                <div className={`
                  w-5 h-5 rounded border-2 mr-3 flex items-center justify-center
                  ${filters.amenities.includes(amenity)
                    ? 'bg-primary-500 border-primary-500'
                    : 'border-gray-300'
                  }
                `}>
                  {filters.amenities.includes(amenity) && (
                    <ApperIcon name="Check" className="w-3 h-3 text-white" />
                  )}
                </div>
                <span className="text-sm">{amenity}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t">
        <Button onClick={handleApply} className="w-full">
          Apply Filters
        </Button>
      </div>
    </motion.div>
  );
};

export default FilterPanel;