
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { user, userData, loading } = useAuth();

    if (loading) return <div>Loading...</div>; // Or a nice spinner

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // If profile is not complete, redirect to profile page
    // check if current path is NOT /profile to avoid infinite loop
    if (userData && !userData.isProfileComplete && window.location.pathname !== "/profile") {
        return <Navigate to="/profile" replace />;
    }

    return children;
};

export default ProtectedRoute;
