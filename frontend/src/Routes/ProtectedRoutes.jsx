// src/components/ProtectedRoute.jsx - CORRECTED
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { authApi } from '../api/Auth';
import { toast } from 'react-toastify';
import useUserStore from '../Stores/User.Store';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading, true/false = determined
  const [loading, setLoading] = useState(true);
const { setUser, setLoading: setStoreLoading } = useUserStore();  

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
  try {
    console.log('🔍 Checking authentication...');
    const response = await authApi.checkAuth();
    console.log('📦 Auth response:', response);
    
    if (response?.success) {
      console.log('✅ User authenticated');
      setUser(response.user);  // ✅ LINE 1: Populate store globally
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  } catch (error) {
    console.error('❌ Auth check error:', error);
    setIsAuthenticated(false);
  } finally {
    setLoading(false);
  }
};


  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // Redirect to landing if not authenticated
  if (isAuthenticated === false) {
    console.log('🚫 Redirecting to landing page');
    toast.error('Please login to access this page', {
      position: 'top-right',
      autoClose: 3000,
    });
    return <Navigate to="/" replace />;
  }

  // Render protected content if authenticated
  console.log('✅ Rendering protected content');
  return children;
};

export default ProtectedRoute;