import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
  isAuthenticated: boolean;
}


const isTokenExpired = (token:string) => {
  try {
    const [, payload] = token.split('.');
    const decodedPayload = JSON.parse(atob(payload));
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedPayload.exp < currentTime) {
      return true;
    }
    return false;
  } catch (err) {
    return true;
  }
};




export const PrivateRoute: React.FC<PrivateRouteProps> = ({ isAuthenticated }) => {


  const token = sessionStorage.getItem('token');


  if (!isAuthenticated || !token || token === "" || isTokenExpired(token)) {
    console.log("NAO TEM TOKEN ou token expirado")
    return <Navigate to="/login" replace />;
  }
  else {
    return <Outlet />;
  }
};
