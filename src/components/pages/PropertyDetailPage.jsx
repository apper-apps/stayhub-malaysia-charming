import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import BookingCalendar from '@/components/organisms/BookingCalendar';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import Rating from '@/components/atoms/Rating';
import PriceDisplay from '@/components/atoms/PriceDisplay';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import ApperIcon from '@/components/ApperIcon';
import { propertyService } from '@/services/api/propertyService';

const PropertyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDates, setSelectedDates] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    loadProperty();
  }, [id]);

  const loadProperty = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await propertyService.getById(parseInt(id));
      setProperty(data);
    } catch (err) {
      console.error('Error loading property:', err);
      setError('Property not found or failed to load.');
    } finally {
      setLoading(false);
    }
  };

  const handleDateSelect = (dates) => {
    setSelectedDates(dates);
  };

  const handleBookNow = () => {
    if (!selectedDates) {
      alert('Please select your check-in and check-out dates first.');
      return;
    }
    navigate(`/booking/${id}`, { state: { property, selectedDates } });
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.photos.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.photos.length - 1 : prev - 1
    );
  };

  const amenityIcons = {
    'WiFi': 'Wifi',
    'Air Conditioning': 'Snowflake',
    'Kitchen': 'ChefHat',
    'Parking': 'Car',
    'Pool': 'Waves',
    'BBQ': 'Flame',
    'TV': 'Monitor',
    'Washing Machine': 'Shirt',
    'Balcony': 'TreePine',
    'Garden': 'Trees'
  };

  if (loading) {
    return <Loading type="calendar" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadProperty} />;
  }

  if (!property) {
    return <Error message="Property not found" />;
  }

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          icon="ArrowLeft"
          size="small"
        >
          Back to Properties
        </Button>
      </motion.div>

      {/* Property Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-display font-bold text-3xl md:text-4xl text-gray-900 mb-2">
              {property.name}
            </h1>
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center">
                <ApperIcon name="MapPin" className="w-5 h-5 mr-1" />
                <span>{property.location.city}, {property.location.state}</span>
              </div>
              <Rating rating={property.rating} />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="success" icon="CheckCircle">
              Verified
            </Badge>
            <Badge variant="info" icon="Users">
              {property.maxGuests} guests
            </Badge>
          </div>
        </div>
      </motion.div>

      {/* Image Gallery */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative"
      >
        <div className="relative h-64 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden">
          <img
            src={property.photos[currentImageIndex]}
            alt={`${property.name} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />
          
          {/* Image Navigation */}
          {property.photos.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200"
              >
                <ApperIcon name="ChevronLeft" className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200"
              >
                <ApperIcon name="ChevronRight" className="w-5 h-5" />
              </button>
            </>
          )}
          
          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
            {currentImageIndex + 1} / {property.photos.length}
          </div>
        </div>

        {/* Thumbnail Gallery */}
        {property.photos.length > 1 && (
          <div className="flex gap-2 mt-4 overflow-x-auto">
            {property.photos.map((photo, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`
                  flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200
                  ${index === currentImageIndex ? 'border-primary-500' : 'border-transparent'}
                `}
              >
                <img
                  src={photo}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Property Details */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 space-y-8"
        >
          {/* Description */}
          <div className="bg-white rounded-xl shadow-card p-6">
            <h2 className="font-display font-semibold text-xl mb-4">About This Place</h2>
            <p className="text-gray-700 leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Property Features */}
          <div className="bg-white rounded-xl shadow-card p-6">
            <h2 className="font-display font-semibold text-xl mb-4">Property Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <ApperIcon name="Users" className="w-5 h-5 text-gray-500 mr-2" />
                <span>{property.maxGuests} guests</span>
              </div>
              <div className="flex items-center">
                <ApperIcon name="Bed" className="w-5 h-5 text-gray-500 mr-2" />
                <span>{property.bedrooms} bedrooms</span>
              </div>
              <div className="flex items-center">
                <ApperIcon name="Bath" className="w-5 h-5 text-gray-500 mr-2" />
                <span>{property.bathrooms} bathrooms</span>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-white rounded-xl shadow-card p-6">
            <h2 className="font-display font-semibold text-xl mb-4">Amenities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {property.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center">
                  <ApperIcon 
                    name={amenityIcons[amenity] || 'Check'} 
                    className="w-5 h-5 text-primary-500 mr-3" 
                  />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="bg-white rounded-xl shadow-card p-6">
            <h2 className="font-display font-semibold text-xl mb-4">Location</h2>
            <div className="space-y-2">
              <div className="flex items-center">
                <ApperIcon name="MapPin" className="w-5 h-5 text-gray-500 mr-2" />
                <span>{property.location.address}</span>
              </div>
              <div className="flex items-center">
                <ApperIcon name="Navigation" className="w-5 h-5 text-gray-500 mr-2" />
                <span>{property.location.city}, {property.location.state}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Booking Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          {/* Price Display */}
          <div className="bg-white rounded-xl shadow-card p-6">
            <div className="text-center mb-4">
              <PriceDisplay 
                amount={property.pricing.basePrice} 
                size="xl" 
                className="block mb-1"
              />
              <span className="text-gray-500">per night</span>
            </div>
            
            {selectedDates && (
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center text-sm">
                  <span>
                    {Math.ceil((selectedDates.checkOut - selectedDates.checkIn) / (1000 * 60 * 60 * 24))} nights
                  </span>
                  <PriceDisplay 
                    amount={Math.ceil((selectedDates.checkOut - selectedDates.checkIn) / (1000 * 60 * 60 * 24)) * property.pricing.basePrice}
                    size="medium"
                  />
                </div>
              </div>
            )}
            
            <Button
              onClick={handleBookNow}
              className="w-full"
              size="large"
              disabled={!selectedDates}
            >
              {selectedDates ? 'Book Now' : 'Select Dates First'}
            </Button>
          </div>

          {/* Calendar */}
          <BookingCalendar
            propertyId={property.Id}
            basePrice={property.pricing.basePrice}
            bookedDates={property.bookedDates || []}
            onDateSelect={handleDateSelect}
          />

          {/* Contact Info */}
          <div className="bg-white rounded-xl shadow-card p-6">
            <h3 className="font-display font-semibold text-lg mb-4">Need Help?</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <ApperIcon name="MessageCircle" className="w-5 h-5 text-primary-500 mr-3" />
                <span className="text-sm">WhatsApp notifications included</span>
              </div>
              <div className="flex items-center">
                <ApperIcon name="Shield" className="w-5 h-5 text-primary-500 mr-3" />
                <span className="text-sm">Secure payment with BayarCash</span>
              </div>
              <div className="flex items-center">
                <ApperIcon name="Clock" className="w-5 h-5 text-primary-500 mr-3" />
                <span className="text-sm">Instant booking confirmation</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;