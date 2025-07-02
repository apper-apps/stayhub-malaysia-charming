import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import PriceDisplay from '@/components/atoms/PriceDisplay';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import { propertyService } from '@/services/api/propertyService';
import { bookingService } from '@/services/api/bookingService';

const OwnerDashboardPage = () => {
  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [propertiesData, bookingsData] = await Promise.all([
        propertyService.getAll(),
        bookingService.getAll()
      ]);
      
      // Simulate owner properties (take first 3)
      setProperties(propertiesData.slice(0, 3));
      setBookings(bookingsData);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getBookingStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'cancelled': return 'error';
      case 'completed': return 'info';
      default: return 'info';
    }
  };

  const calculateStats = () => {
    const totalRevenue = bookings
      .filter(booking => booking.status === 'confirmed' || booking.status === 'completed')
      .reduce((sum, booking) => sum + booking.totalPrice, 0);

    const upcomingBookings = bookings.filter(booking => 
      booking.status === 'confirmed' && new Date(booking.checkIn) > new Date()
    ).length;

    const totalGuests = bookings
      .filter(booking => booking.status === 'confirmed' || booking.status === 'completed')
      .reduce((sum, booking) => sum + booking.guests, 0);

    return { totalRevenue, upcomingBookings, totalGuests };
  };

  const { totalRevenue, upcomingBookings, totalGuests } = calculateStats();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'properties', label: 'My Properties', icon: 'Home' },
    { id: 'bookings', label: 'Bookings', icon: 'Calendar' },
    { id: 'analytics', label: 'Analytics', icon: 'TrendingUp' }
  ];

  if (loading) {
    return <Loading type="bookings" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadDashboardData} />;
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
            Owner Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your properties and track your homestay business performance
          </p>
        </div>
        <Button icon="Plus" onClick={() => alert('Add new property functionality would go here')}>
          Add New Property
        </Button>
      </motion.div>

      {/* Navigation Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
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
            </button>
          ))}
        </nav>
      </motion.div>

      {/* Tab Content */}
      <div className="space-y-8">
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-primary-500 p-3 rounded-lg">
                    <ApperIcon name="DollarSign" className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="success" icon="TrendingUp">+12%</Badge>
                </div>
                <div>
                  <PriceDisplay amount={totalRevenue} size="xl" className="block mb-1" />
                  <p className="text-sm text-gray-600">Total Revenue</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-secondary-500 p-3 rounded-lg">
                    <ApperIcon name="Calendar" className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="info" icon="Clock">{upcomingBookings} upcoming</Badge>
                </div>
                <div>
                  <div className="text-3xl font-bold text-secondary-600 mb-1">
                    {bookings.length}
                  </div>
                  <p className="text-sm text-gray-600">Total Bookings</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-accent-500 p-3 rounded-lg">
                    <ApperIcon name="Users" className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="warning" icon="Star">4.8 avg</Badge>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent-600 mb-1">
                    {totalGuests}
                  </div>
                  <p className="text-sm text-gray-600">Total Guests</p>
                </div>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-xl shadow-card">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="font-display font-semibold text-xl">Recent Bookings</h2>
                  <Button variant="outline" size="small">View All</Button>
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {bookings.slice(0, 5).map((booking) => (
                  <div key={booking.Id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium">{booking.guestName}</h3>
                          <Badge variant={getBookingStatusColor(booking.status)}>
                            {booking.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600">
                          {format(new Date(booking.checkIn), 'MMM dd')} - {format(new Date(booking.checkOut), 'MMM dd, yyyy')}
                        </div>
                      </div>
                      <div className="text-right">
                        <PriceDisplay amount={booking.totalPrice} size="medium" />
                        <div className="text-sm text-gray-500">
                          {booking.guests} guests
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'properties' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {properties.length === 0 ? (
              <Empty
                icon="Home"
                title="No Properties Listed"
                description="Start by adding your first property to begin accepting bookings."
                actionLabel="Add Property"
                onAction={() => alert('Add property functionality would go here')}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <div key={property.Id} className="card">
                    <div className="relative h-48 overflow-hidden rounded-t-xl">
                      <img
                        src={property.photos[0]}
                        alt={property.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3">
                        <Badge variant="success">Active</Badge>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-display font-semibold text-lg mb-2">
                        {property.name}
                      </h3>
                      <div className="flex items-center text-gray-600 mb-3">
                        <ApperIcon name="MapPin" className="w-4 h-4 mr-1" />
                        <span className="text-sm">
                          {property.location.city}, {property.location.state}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <PriceDisplay amount={property.pricing.basePrice} />
                        <div className="flex gap-2">
                          <Button variant="outline" size="small">
                            Edit
                          </Button>
                          <Button variant="ghost" size="small">
                            <ApperIcon name="MoreHorizontal" className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'bookings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-card overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="font-display font-semibold text-xl">All Bookings</h2>
            </div>
            
            {bookings.length === 0 ? (
              <div className="p-8">
                <Empty
                  icon="Calendar"
                  title="No Bookings Yet"
                  description="Your bookings will appear here once guests start booking your properties."
                />
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {bookings.map((booking) => (
                  <div key={booking.Id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium">{booking.guestName}</h3>
                          <Badge variant={getBookingStatusColor(booking.status)}>
                            {booking.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600 mb-1">
                          {booking.propertyName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {format(new Date(booking.checkIn), 'MMM dd')} - {format(new Date(booking.checkOut), 'MMM dd, yyyy')} • {booking.guests} guests
                        </div>
                      </div>
                      <div className="text-right">
                        <PriceDisplay amount={booking.totalPrice} size="medium" />
                        <div className="text-sm text-gray-500 mt-1">
                          ID: {booking.Id}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl shadow-card p-6">
              <h2 className="font-display font-semibold text-xl mb-4">Performance Analytics</h2>
              <div className="text-center py-16">
                <ApperIcon name="BarChart3" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="font-medium text-lg mb-2">Analytics Coming Soon</h3>
                <p className="text-gray-600">
                  Detailed analytics and insights will be available in the next update.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboardPage;