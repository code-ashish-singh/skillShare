import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Menu, X, Zap, LogOut, User, LayoutDashboard, BookOpen, Star, Briefcase, Settings } from "lucide-react";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => { logout(); navigate("/"); setProfileOpen(false); };

  const seekerLinks = [
    { to: "/", label: "Home" },
    { to: "/explore", label: "Explore" },
    { to: "/seeker/bookings", label: "My Bookings" },
  ];
  const providerLinks = [
    { to: "/provider/dashboard", label: "Dashboard" },
    { to: "/provider/skills", label: "Skills" },
    { to: "/provider/plans", label: "Plans" },
    { to: "/provider/bookings", label: "Bookings" },
  ];
  const publicLinks = [
    { to: "/", label: "Home" },
    { to: "/explore", label: "Explore" },
    { to: "/blogs", label: "Blogs" },
  ];

  const links = !isAuthenticated ? publicLinks : user?.role === "skillSeeker" ? seekerLinks : user?.role === "skillProvider" ? providerLinks : publicLinks;

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Zap size={18} className="text-white" />
            </div>
            <span className="tracking-tight">SkillShare</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(l => (
              <Link key={l.to} to={l.to} className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary hover:bg-primary-50 rounded-lg transition-all">
                {l.label}
              </Link>
            ))}
            {!isAuthenticated && (
              <Link to="/blogs" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary hover:bg-primary-50 rounded-lg transition-all">Blogs</Link>
            )}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="btn-outline text-sm">Login</Link>
                <Link to="/signup" className="btn-primary text-sm">Get Started</Link>
              </>
            ) : (
              <div className="relative">
                <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 p-1 rounded-xl hover:bg-gray-100 transition-all">
                  <img src={user.avatar || "https://i.pravatar.cc/150"} alt={user.name} className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20" />
                  <span className="text-sm font-medium text-gray-700">{user.name.split(" ")[0]}</span>
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-lg border border-gray-100 py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                      <p className="text-xs text-gray-400 capitalize">{user.role}</p>
                    </div>
                    <Link to={user.role === "skillSeeker" ? "/seeker/profile" : "/provider/profile"} onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-all">
                      <User size={14} /> Profile
                    </Link>
                    {user.role === "skillSeeker" && (
                      <Link to="/seeker/reviews" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-all">
                        <Star size={14} /> My Reviews
                      </Link>
                    )}
                    <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 w-full text-left transition-all">
                      <LogOut size={14} /> Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-100">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1">
          {links.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)} className="block px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary hover:bg-primary-50 rounded-lg">
              {l.label}
            </Link>
          ))}
          {!isAuthenticated && (
            <Link to="/blogs" onClick={() => setMobileOpen(false)} className="block px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary hover:bg-primary-50 rounded-lg">Blogs</Link>
          )}
          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            {!isAuthenticated ? (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)} className="btn-outline text-center">Login</Link>
                <Link to="/signup" onClick={() => setMobileOpen(false)} className="btn-primary text-center">Get Started</Link>
              </>
            ) : (
              <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 font-medium">
                <LogOut size={14} /> Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
