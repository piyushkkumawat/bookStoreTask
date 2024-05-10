import React from "react";
import { Navigate } from "react-router-dom";
import useAdmin from "../Hook/useAdmin";

const AdminRoute = ({ element: Element }) => {
  const isAdmin = useAdmin();
  // Check if the user is authenticated
  return isAdmin ? Element : <Navigate to="/login" />;
};

export default AdminRoute;
