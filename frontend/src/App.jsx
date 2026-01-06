// src/App.jsx - CORRECTED
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Landing from './Pages/Landing';
import Dashboard from './Pages/Dashboard';
import Settings from './Pages/Settings';
import Posts from './Pages/Posts';
import ProtectedRoute from './Routes/ProtectedRoutes';

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Landing />} />

        {/* Protected Routes - Using children pattern */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/settings" 
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/posts" 
          element={
            <ProtectedRoute>
              <Posts />
            </ProtectedRoute>
          } 
        />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;