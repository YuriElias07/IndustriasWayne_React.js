import { Navigate } from "react-router-dom";
import React from "react";

export const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("authenticated", false);

  return user ? children : <Navigate to="/login" />;
};
