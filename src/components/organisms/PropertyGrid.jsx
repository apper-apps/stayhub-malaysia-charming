import React from 'react';
import { motion } from 'framer-motion';
import PropertyCard from '@/components/molecules/PropertyCard';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';

const PropertyGrid = ({ 
  properties, 
  loading, 
  error, 
  onRetry,
  className = '' 
}) => {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={onRetry} />;
  }

  if (!properties || properties.length === 0) {
    return (
      <Empty
        icon="Home"
        title="No Properties Found"
        description="We couldn't find any properties matching your criteria. Try adjusting your search filters."
        actionLabel="Browse All Properties"
        onAction={() => window.location.reload()}
      />
    );
  }

  return (
    <div className={className}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {properties.map((property, index) => (
          <motion.div
            key={property.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <PropertyCard property={property} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default PropertyGrid;