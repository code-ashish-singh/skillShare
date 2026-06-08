import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ROLE_MAP = {
  seeker: "skillSeeker",
  provider: "skillProvider",
};

export default function ProtectedRoute({ children, role }) {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  const expectedRole = ROLE_MAP[role] || role;
  if (role && user?.role !== expectedRole) return <Navigate to="/" replace />;
  return children;
}
