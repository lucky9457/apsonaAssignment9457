// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ element }) => {
  const token = Cookies.get('token');
  
  if (!token) {
    // If there is no token, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If the token exists, render the protected component
  return element;
};

export default ProtectedRoute;
