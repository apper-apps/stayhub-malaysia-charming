import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BookingCard from '@/components/molecules/BookingCard';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import { bookingService } from '@/services/api/bookingService';
import { toast } from 'react-toastify';

const GuestDashboardPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('upcoming');

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await bookingService.getAll();
      setBookings(data);
    } catch (err) {
      console.error('Error loading bookings:', err);
      setError('Failed to load bookings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      await bookingService.update(bookingId, { status: 'cancelled' });
      setBookings(prev => 
        prev.map(booking => 
          booking.Id === bookingId 
            ? { ...booking, status: 'cancelled' }
            : booking
        )
      );
      toast.success('Booking cancelled successfully');
    } catch (err) {
      console.error('Error cancelling booking:', err);
      toast.error('Failed to cancel booking. Please try again.');
    }
  };

  const handleViewDetails = (booking) => {
    alert(`Booking details for ${booking.propertyName} would be shown here.`);
  };

  const filterBookings = (status) => {
    const now = new Date();
    
    switch (status) {
      case 'upcoming':
        return bookings.filter(booking => 
          booking.status === 'confirmed' && new Date(booking.checkIn) > now
        );
      case 'current':
        return bookings.filter(booking => 
          booking.status === 'confirmed' && 
          new Date(booking.checkIn) <= now && 
          new Date(booking.checkOut) > now
        );
      case 'past':
        return bookings.filter(booking => 
          booking.status === 'completed' || 
          (booking.status === 'confirmed' && new Date(booking.checkOut) <= now)
        );
      case 'cancelled':
        return bookings.filter(booking => booking.status === 'cancelled');
      default:
        return bookings;
    }
  };

  const getTabCount = (status) => {
    return filterBookings(status).length;
  };

  const tabs = [
    { id: 'upcoming', label: 'Upcoming', icon: 'Calendar', count: getTabCount('upcoming') },
    { id: 'current', label: 'Current', icon: 'MapPin', count: getTabCount('current') },
    { id: 'past', label: 'Past', icon: 'History', count: getTabCount('past') },
    { id: 'cancelled', label: 'Cancelled', icon: 'XCircle', count: getTabCount('cancelled') }
  ];

  const filteredBookings = filterBookings(activeTab);

  if (loading) {
    return <Loading type="bookings" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadBookings} />;
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="font-display font-bold text-3xl text-gray-900 mb-2">
            My Bookings
          </h1>
          <p className="text-gray-600">
            Manage your homestay reservations and travel history
          </p>
        </div>
        <Button 
          icon="Search" 
          onClick={() => window.location.href = '/properties'}
        >
          Book New Stay
        </Button>
      </motion.div>

      {/* Booking Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary-500 p-2 rounded-lg">
              <ApperIcon name="Calendar" className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-primary-600">
                {getTabCount('upcoming')}
              </div>
              <div className="text-sm text-gray-600">Upcoming</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="bg-secondary-500 p-2 rounded-lg">
              <ApperIcon name="MapPin" className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-secondary-600">
                {getTabCount('current')}
              </div>
              <div className="text-sm text-gray-600">Current</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="bg-accent-500 p-2 rounded-lg">
              <ApperIcon name="History" className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-accent-600">
                {getTabCount('past')}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="bg-gray-500 p-2 rounded-lg">
              <ApperIcon name="XCircle" className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-600">
                {getTabCount('cancelled')}
              </div>
              <div className="text-sm text-gray-600">Cancelled</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="border-b border-gray-200"
      >
        <nav className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-1 py-4 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200
                ${activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                }
              `}
            >
              <ApperIcon name={tab.icon} className="w-4 h-4" />
              {tab.label}
              {tab.count > 0 && (
                <Badge variant="primary" size="small">
                  {tab.count}
                </Badge>
              )}
            </button>
          ))}
        </nav>
      </motion.div>

      {/* Bookings List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {filteredBookings.length === 0 ? (
          <div className="py-16">
            <Empty
              icon={tabs.find(tab => tab.id === activeTab)?.icon || 'Calendar'}
              title={`No ${activeTab} bookings`}
              description={`You don't have any ${activeTab} bookings at the moment.`}
              actionLabel="Browse Properties"
              onAction={() => window.location.href = '/properties'}
            />
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking, index) => (
              <motion.div
                key={booking.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <BookingCard
                  booking={booking}
                  onCancel={handleCancelBooking}
                  onViewDetails={handleViewDetails}
                />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default GuestDashboardPage;