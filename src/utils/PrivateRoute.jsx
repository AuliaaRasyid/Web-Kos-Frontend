import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

const PrivateRoute = ({ children, allowedRoles }) => {
  const [showAlert, setShowAlert] = useState(false);
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const location = useLocation();

  useEffect(() => {
    if (!token) {
      setShowAlert(true);
    }
  }, [token]);

  useEffect(() => {
    if (showAlert) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You need to login first!',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
          window.location.href = '/LoginPage'; 
        }
      });
    }
  }, [showAlert]);

  if (!token) {
    return null; // Show nothing while the alert is being displayed
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/AccessDenied" replace />;
  }

  return children;
};

export default PrivateRoute;
