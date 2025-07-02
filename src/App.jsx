import 'react-toastify/dist/ReactToastify.css'
import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PropertyDetailPage from "@/components/pages/PropertyDetailPage";
import GuestDashboardPage from "@/components/pages/GuestDashboardPage";
import HomePage from "@/components/pages/HomePage";
import OwnerDashboardPage from "@/components/pages/OwnerDashboardPage";
import BookingPage from "@/components/pages/BookingPage";
import PropertiesPage from "@/components/pages/PropertiesPage";
import Layout from "@/components/organisms/Layout";

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