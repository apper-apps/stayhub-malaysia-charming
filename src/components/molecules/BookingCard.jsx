import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import PriceDisplay from '@/components/atoms/PriceDisplay';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const BookingCard = ({ booking, onCancel, onViewDetails, className = '' }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'cancelled': return 'error';
      case 'completed': return 'info';
      default: return 'info';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return 'CheckCircle';
      case 'pending': return 'Clock';
      case 'cancelled': return 'XCircle';
      case 'completed': return 'CheckCircle2';
      default: return 'Info';
    }
  };

  const formatDate = (date) => {
    return format(new Date(date), 'MMM dd, yyyy');
  };

  const canCancel = booking.status === 'confirmed' || booking.status === 'pending';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`card ${className}`}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-display font-semibold text-lg text-gray-900 mb-1">
              {booking.propertyName}
            </h3>
            <div className="flex items-center text-gray-600 text-sm">
              <ApperIcon name="MapPin" className="w-4 h-4 mr-1" />
              {booking.propertyLocation}
            </div>
          </div>
          <Badge 
            variant={getStatusColor(booking.status)}
            icon={getStatusIcon(booking.status)}
          >
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-sm text-gray-500 mb-1">Check-in</div>
            <div className="font-medium">{formatDate(booking.checkIn)}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">Check-out</div>
            <div className="font-medium">{formatDate(booking.checkOut)}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-sm text-gray-500 mb-1">Guests</div>
            <div className="font-medium flex items-center">
              <ApperIcon name="Users" className="w-4 h-4 mr-1" />
              {booking.guests}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">Total Price</div>
            <PriceDisplay amount={booking.totalPrice} size="medium" />
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Booking ID: {booking.Id}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="small"
                onClick={() => onViewDetails(booking)}
              >
                View Details
              </Button>
              {canCancel && (
                <Button
                  variant="danger"
                  size="small"
                  onClick={() => onCancel(booking.Id)}
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookingCard;