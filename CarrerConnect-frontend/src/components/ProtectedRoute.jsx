
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({
    children,
    allowedRoles
}) {

    const { user, isAuthenticated } = useAuth();

    const location = useLocation();


    // Not logged in
    if (!isAuthenticated) {

        return (
            <Navigate
                to="/login"
                state={{ from: location.pathname }}
                replace
            />
        );

    }


    // Logged in but role is not allowed
    if (
        allowedRoles &&
        !allowedRoles.includes(user?.role)
    ) {

        // Send user to their own dashboard

        if (user?.role === "RECRUITER") {

            return (
                <Navigate
                    to="/recruiter"
                    replace
                />
            );

        }


        if (user?.role === "ADMIN") {

            return (
                <Navigate
                    to="/admin"
                    replace
                />
            );

        }


        return (
            <Navigate
                to="/dashboard"
                replace
            />
        );

    }


    return children;
}

