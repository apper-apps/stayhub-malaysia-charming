import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';

const SearchBar = ({ onSearch, className = '' }) => {
  const [searchData, setSearchData] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: '2'
  });

  const handleInputChange = (field, value) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = () => {
    onSearch(searchData);
  };

  const guestOptions = [
    { value: '1', label: '1 Guest' },
    { value: '2', label: '2 Guests' },
    { value: '3', label: '3 Guests' },
    { value: '4', label: '4 Guests' },
    { value: '5', label: '5 Guests' },
    { value: '6', label: '6+ Guests' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        bg-white rounded-2xl shadow-elevated p-6
        ${className}
      `}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-end">
        <div className="lg:col-span-2">
          <Input
            label="Where to?"
            placeholder="Enter city, state, or property name"
            value={searchData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            icon="MapPin"
          />
        </div>
        
        <div>
          <Input
            label="Check-in"
            type="date"
            value={searchData.checkIn}
            onChange={(e) => handleInputChange('checkIn', e.target.value)}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        
        <div>
          <Input
            label="Check-out"
            type="date"
            value={searchData.checkOut}
            onChange={(e) => handleInputChange('checkOut', e.target.value)}
            min={searchData.checkIn || new Date().toISOString().split('T')[0]}
          />
        </div>
        
        <div>
          <Select
            label="Guests"
            value={searchData.guests}
            onChange={(e) => handleInputChange('guests', e.target.value)}
            options={guestOptions}
          />
        </div>
        
        <div className="lg:col-span-full xl:col-span-1">
          <Button
            onClick={handleSearch}
            className="w-full"
            size="large"
            icon="Search"
          >
            Search
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default SearchBar;