import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import MainLayout from "./layouts/MainLayout";
import ProviderLayout from "./layouts/ProviderLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

// Public pages
import HomePage from "./pages/public/HomePage";
import ExplorePage from "./pages/public/ExplorePage";
import ProviderDetailsPage from "./pages/public/ProviderDetailsPage";
import BlogsPage from "./pages/public/BlogsPage";
import BlogDetailPage from "./pages/public/BlogDetailPage";
import LoginPage from "./pages/public/LoginPage";
import SignupPage from "./pages/public/SignupPage";

// Seeker pages
import SeekerBookings from "./pages/seeker/SeekerBookings";
import SeekerProfile from "./pages/seeker/SeekerProfile";
import SeekerReviews from "./pages/seeker/SeekerReviews";

// Provider pages
import ProviderDashboard from "./pages/provider/ProviderDashboard";
import ProviderSkills from "./pages/provider/ProviderSkills";
import ProviderPlans from "./pages/provider/ProviderPlans";
import ProviderBookings from "./pages/provider/ProviderBookings";
import ProviderProfile from "./pages/provider/ProviderProfile";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes with main layout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/provider/:id" element={<ProviderDetailsPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/blogs/:id" element={<BlogDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Seeker routes */}
            <Route path="/seeker/bookings" element={
              <ProtectedRoute role="seeker"><SeekerBookings /></ProtectedRoute>
            } />
            <Route path="/seeker/profile" element={
              <ProtectedRoute role="seeker"><SeekerProfile /></ProtectedRoute>
            } />
            <Route path="/seeker/reviews" element={
              <ProtectedRoute role="seeker"><SeekerReviews /></ProtectedRoute>
            } />
          </Route>

          {/* Provider routes with sidebar layout */}
          <Route element={
            <ProtectedRoute role="provider"><ProviderLayout /></ProtectedRoute>
          }>
            <Route path="/provider/dashboard" element={<ProviderDashboard />} />
            <Route path="/provider/skills" element={<ProviderSkills />} />
            <Route path="/provider/plans" element={<ProviderPlans />} />
            <Route path="/provider/bookings" element={<ProviderBookings />} />
            <Route path="/provider/profile" element={<ProviderProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
