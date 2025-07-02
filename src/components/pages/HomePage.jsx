import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SearchBar from "@/components/molecules/SearchBar";
import PropertyCard from "@/components/molecules/PropertyCard";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { propertyService } from "@/services/api/propertyService";

const HomePage = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadFeaturedProperties();
  }, []);

  const loadFeaturedProperties = async () => {
    try {
      setLoading(true);
      const properties = await propertyService.getAll();
      // Get first 6 properties as featured
      setFeaturedProperties(properties.slice(0, 6));
    } catch (error) {
      console.error('Error loading featured properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchData) => {
    navigate('/properties', { state: { searchData } });
  };

  const features = [
    {
      icon: 'Shield',
      title: 'Verified Properties',
      description: 'All homestays are verified for quality and safety'
    },
    {
      icon: 'CreditCard',
      title: 'Secure Payments',
      description: 'Safe transactions with BayarCash integration'
    },
    {
      icon: 'MessageCircle',
      title: 'WhatsApp Updates',
      description: 'Instant booking confirmations via WhatsApp'
    },
    {
      icon: 'Star',
      title: 'Top Rated',
      description: 'Highly rated properties across Malaysia'
    }
  ];

  return (
    <div className="space-y-16">
{/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%23000%22%20fill-opacity%3D%220.02%22%3E%3Cpath%20d%3D%22m0%2040%2040-40V0H0v40Z%22/%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative px-8 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-display font-bold text-4xl md:text-6xl text-gray-900 mb-6">
                Discover Amazing
                <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                  {' '}Homestays
                </span>
                <br />
                Across Malaysia
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Book unique accommodations from local hosts. Experience authentic Malaysian hospitality with verified properties and secure payments.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <SearchBar onSearch={handleSearch} className="max-w-5xl mx-auto" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-bold text-3xl text-gray-900 mb-4">
            Why Choose StayHub Malaysia?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We make homestay booking simple, secure, and seamless for both guests and property owners.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="text-center"
            >
              <div className="bg-gradient-to-br from-primary-100 to-secondary-100 p-4 rounded-2xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <ApperIcon name={feature.icon} className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Properties */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h2 className="font-display font-bold text-3xl text-gray-900 mb-2">
              Featured Properties
            </h2>
            <p className="text-lg text-gray-600">
              Handpicked accommodations that offer exceptional experiences
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate('/properties')}
            icon="ArrowRight"
            iconPosition="right"
          >
            View All
          </Button>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(null).map((_, index) => (
              <div key={index} className="card animate-pulse">
                <div className="h-48 bg-gray-200 shimmer"></div>
                <div className="p-4 space-y-3">
                  <div className="h-6 bg-gray-200 rounded shimmer"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 shimmer"></div>
                  <div className="h-16 bg-gray-200 rounded shimmer"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((property, index) => (
              <motion.div
                key={property.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl overflow-hidden">
        <div className="px-8 py-16 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of satisfied guests who have discovered amazing homestays across Malaysia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="large"
                onClick={() => navigate('/properties')}
                icon="Search"
              >
                Find Your Stay
              </Button>
              <Button
                variant="outline"
                size="large"
                onClick={() => navigate('/owner-dashboard')}
                icon="Home"
                className="bg-transparent border-white text-white hover:bg-white hover:text-primary-500"
              >
                List Your Property
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;