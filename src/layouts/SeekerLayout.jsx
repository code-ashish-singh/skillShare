import { Outlet, Navigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { useAuth } from "../context/AuthContext";

export default function SeekerLayout() {
  const { isAuthenticated, isSeeker } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!isSeeker) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
