import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PriceDisplay from '@/components/atoms/PriceDisplay';
import Rating from '@/components/atoms/Rating';
import Badge from '@/components/atoms/Badge';
import ApperIcon from '@/components/ApperIcon';

const PropertyCard = ({ property, className = '' }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/property/${property.Id}`);
  };

  const amenityIcons = {
    'WiFi': 'Wifi',
    'Air Conditioning': 'Snowflake',
    'Kitchen': 'ChefHat',
    'Parking': 'Car',
    'Pool': 'Waves',
    'BBQ': 'Flame'
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`card cursor-pointer overflow-hidden ${className}`}
      onClick={handleClick}
    >
      {/* Image Carousel */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <img
          src={property.photos[0]}
          alt={property.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="success" icon="CheckCircle">
            Verified
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <div className="bg-white rounded-lg px-2 py-1">
            <PriceDisplay 
              amount={property.pricing.basePrice} 
              size="small" 
            />
            <span className="text-xs text-gray-500">/night</span>
          </div>
        </div>
        <div className="absolute bottom-3 left-3">
          <Rating rating={property.rating} size="small" />
        </div>
      </div>

      {/* Property Details */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-display font-semibold text-lg text-gray-900 line-clamp-1">
            {property.name}
          </h3>
        </div>

        <div className="flex items-center text-gray-600 mb-3">
          <ApperIcon name="MapPin" className="w-4 h-4 mr-1" />
          <span className="text-sm">
            {property.location.city}, {property.location.state}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {property.description}
        </p>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {property.amenities.slice(0, 3).map((amenity, index) => (
            <div key={index} className="flex items-center text-xs text-gray-500">
              <ApperIcon 
                name={amenityIcons[amenity] || 'Check'} 
                className="w-3 h-3 mr-1" 
              />
              {amenity}
            </div>
          ))}
          {property.amenities.length > 3 && (
            <span className="text-xs text-gray-400">
              +{property.amenities.length - 3} more
            </span>
          )}
        </div>

        {/* Property Stats */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <ApperIcon name="Users" className="w-4 h-4 mr-1" />
              <span>{property.maxGuests} guests</span>
            </div>
            <div className="flex items-center">
              <ApperIcon name="Bed" className="w-4 h-4 mr-1" />
              <span>{property.bedrooms} beds</span>
            </div>
          </div>
          <div className="text-right">
            <PriceDisplay 
              amount={property.pricing.basePrice} 
              size="medium" 
              className="text-primary-600"
            />
            <div className="text-xs text-gray-500">/night</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;