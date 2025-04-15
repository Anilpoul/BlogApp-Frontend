import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const location = useLocation();

    if (!token) {
        return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

export default ProtectedRoute;
