// components/AdminRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem("user"));

  if (!userData || userData.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminRoute;
