import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import PriceDisplay from '@/components/atoms/PriceDisplay';
import Badge from '@/components/atoms/Badge';
import ApperIcon from '@/components/ApperIcon';
import { bookingService } from '@/services/api/bookingService';
import { toast } from 'react-toastify';

const BookingPage = () => {
  const { propertyId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const { property, selectedDates } = location.state || {};
  
  const [guestDetails, setGuestDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    guests: '2',
    specialRequests: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState('bayarcash');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!property || !selectedDates) {
      navigate('/properties');
    }
  }, [property, selectedDates, navigate]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!guestDetails.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!guestDetails.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!guestDetails.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(guestDetails.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!guestDetails.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setGuestDetails(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const calculateBookingDetails = () => {
    if (!selectedDates) return { nights: 0, subtotal: 0, taxes: 0, total: 0 };
    
    const nights = Math.ceil((selectedDates.checkOut - selectedDates.checkIn) / (1000 * 60 * 60 * 24));
    const subtotal = nights * property.pricing.basePrice;
    const taxes = subtotal * 0.06; // 6% tax
    const total = subtotal + taxes;
    
    return { nights, subtotal, taxes, total };
  };

  const handleBooking = async () => {
    if (!validateForm()) {
      toast.error('Please fill in all required fields correctly.');
      return;
    }

    setIsProcessing(true);
    
    try {
      const bookingDetails = calculateBookingDetails();
      
      const bookingData = {
        propertyId: parseInt(propertyId),
        propertyName: property.name,
        propertyLocation: `${property.location.city}, ${property.location.state}`,
        guestName: `${guestDetails.firstName} ${guestDetails.lastName}`,
        guestEmail: guestDetails.email,
        guestPhone: guestDetails.phone,
        checkIn: selectedDates.checkIn.toISOString(),
        checkOut: selectedDates.checkOut.toISOString(),
        guests: parseInt(guestDetails.guests),
        totalPrice: bookingDetails.total,
        status: 'confirmed',
        paymentStatus: 'paid',
        paymentMethod: paymentMethod,
        specialRequests: guestDetails.specialRequests
      };

      const newBooking = await bookingService.create(bookingData);
      
      toast.success('Booking confirmed! WhatsApp notification sent.');
      
      // Redirect to guest dashboard after short delay
      setTimeout(() => {
        navigate('/guest-dashboard');
      }, 2000);
      
    } catch (error) {
      console.error('Error creating booking:', error);
      toast.error('Failed to complete booking. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!property || !selectedDates) {
    return null;
  }

  const bookingDetails = calculateBookingDetails();
  
  const guestOptions = [
    { value: '1', label: '1 Guest' },
    { value: '2', label: '2 Guests' },
    { value: '3', label: '3 Guests' },
    { value: '4', label: '4 Guests' },
    { value: '5', label: '5 Guests' },
    { value: '6', label: '6+ Guests' }
  ];

  const paymentOptions = [
    { value: 'bayarcash', label: 'BayarCash (Recommended)' },
    { value: 'card', label: 'Credit/Debit Card' },
    { value: 'bank', label: 'Online Banking' }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          icon="ArrowLeft"
          size="small"
        >
          Back
        </Button>
        <div>
          <h1 className="font-display font-bold text-3xl text-gray-900">
            Complete Your Booking
          </h1>
          <p className="text-gray-600">
            You're just one step away from your perfect stay
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Booking Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Guest Information */}
          <div className="bg-white rounded-xl shadow-card p-6">
            <h2 className="font-display font-semibold text-xl mb-6">Guest Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="First Name"
                value={guestDetails.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                error={errors.firstName}
                required
              />
              <Input
                label="Last Name"
                value={guestDetails.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                error={errors.lastName}
                required
              />
              <Input
                label="Email Address"
                type="email"
                value={guestDetails.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                error={errors.email}
                required
              />
              <Input
                label="Phone Number"
                value={guestDetails.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                error={errors.phone}
                required
              />
              <div className="md:col-span-2">
                <Select
                  label="Number of Guests"
                  value={guestDetails.guests}
                  onChange={(e) => handleInputChange('guests', e.target.value)}
                  options={guestOptions}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="label">Special Requests (Optional)</label>
                <textarea
                  value={guestDetails.specialRequests}
                  onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                  rows={3}
                  className="input-field resize-none"
                  placeholder="Any special requests or requirements..."
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-xl shadow-card p-6">
            <h2 className="font-display font-semibold text-xl mb-6">Payment Method</h2>
            <div className="space-y-3">
              {paymentOptions.map((option) => (
                <label key={option.value} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={option.value}
                    checked={paymentMethod === option.value}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="sr-only"
                  />
                  <div className={`
                    w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center
                    ${paymentMethod === option.value
                      ? 'bg-primary-500 border-primary-500'
                      : 'border-gray-300'
                    }
                  `}>
                    {paymentMethod === option.value && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="flex-1">{option.label}</span>
                  {option.value === 'bayarcash' && (
                    <Badge variant="success" size="small">Secure</Badge>
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <ApperIcon name="Info" className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <h3 className="font-medium mb-2">Booking Terms</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Free cancellation up to 24 hours before check-in</li>
                  <li>• WhatsApp notifications will be sent to your phone</li>
                  <li>• Check-in time: 3:00 PM | Check-out time: 11:00 AM</li>
                  <li>• Valid ID required upon check-in</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Booking Summary */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Property Summary */}
          <div className="bg-white rounded-xl shadow-card overflow-hidden sticky top-24">
            <div className="relative h-48">
              <img
                src={property.photos[0]}
                alt={property.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-display font-semibold text-lg">
                  {property.name}
                </h3>
                <div className="flex items-center text-sm">
                  <ApperIcon name="MapPin" className="w-4 h-4 mr-1" />
                  {property.location.city}, {property.location.state}
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Check-in</span>
                <span className="font-medium">
                  {format(selectedDates.checkIn, 'MMM dd, yyyy')}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Check-out</span>
                <span className="font-medium">
                  {format(selectedDates.checkOut, 'MMM dd, yyyy')}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Guests</span>
                <span className="font-medium">{guestDetails.guests}</span>
              </div>

              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between">
                  <span>
                    RM{property.pricing.basePrice} × {bookingDetails.nights} nights
                  </span>
                  <PriceDisplay amount={bookingDetails.subtotal} showCurrency={false} />
                </div>
                <div className="flex justify-between">
                  <span>Taxes & fees</span>
                  <PriceDisplay amount={bookingDetails.taxes} showCurrency={false} />
                </div>
                <div className="border-t pt-3 flex justify-between items-center">
                  <span className="font-semibold">Total</span>
                  <PriceDisplay amount={bookingDetails.total} size="large" />
                </div>
              </div>

              <Button
                onClick={handleBooking}
                disabled={isProcessing}
                loading={isProcessing}
                className="w-full"
                size="large"
              >
                {isProcessing ? 'Processing...' : 'Confirm Booking'}
              </Button>

              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <ApperIcon name="Shield" className="w-4 h-4" />
                <span>Secure payment protected by BayarCash</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingPage;