import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const location = useLocation();

    // If no token, redirect to login page
    if (!token) {
        return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
    }

    // If the user doesn't have the allowed role, redirect to unauthorized page
    if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    // If everything is fine, render the children
    return children;
};

export default ProtectedRoute;
