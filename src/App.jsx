import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from '@/components/organisms/Layout';
import HomePage from '@/components/pages/HomePage';
import PropertiesPage from '@/components/pages/PropertiesPage';
import PropertyDetailPage from '@/components/pages/PropertyDetailPage';
import OwnerDashboardPage from '@/components/pages/OwnerDashboardPage';
import GuestDashboardPage from '@/components/pages/GuestDashboardPage';
import BookingPage from '@/components/pages/BookingPage';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/property/:id" element={<PropertyDetailPage />} />
          <Route path="/owner-dashboard" element={<OwnerDashboardPage />} />
          <Route path="/guest-dashboard" element={<GuestDashboardPage />} />
          <Route path="/booking/:propertyId" element={<BookingPage />} />
        </Routes>
      </Layout>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
    </div>
  );
}

export default App;