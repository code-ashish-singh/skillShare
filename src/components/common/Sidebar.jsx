import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Code2, DollarSign, Calendar, User, Zap } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { to: "/provider/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/provider/skills", icon: Code2, label: "Skills" },
  { to: "/provider/plans", icon: DollarSign, label: "Plans" },
  { to: "/provider/bookings", icon: Calendar, label: "Bookings" },
  { to: "/provider/profile", icon: User, label: "Profile" },
];

export default function Sidebar() {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <aside className="w-60 bg-white border-r border-gray-100 min-h-screen flex flex-col">
      <div className="p-6 border-b border-gray-100">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg text-gray-900">
          <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
            <Zap size={14} className="text-white" fill="white" />
          </div>
          Skill<span className="text-primary">Share</span>
        </Link>
      </div>

      <div className="p-4 border-b border-gray-50">
        <div className="flex items-center gap-3 p-3 bg-primary-50 rounded-xl">
          <img src={user?.avatar} alt={user?.name} className="w-9 h-9 rounded-xl bg-gray-100 object-cover" />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{user?.name}</p>
            <p className="text-xs text-primary font-medium">Skill Provider</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => {
          const active = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${active ? "bg-primary text-white shadow-sm" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
            >
              <Icon size={17} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <p className="text-xs text-gray-400 text-center">SkillShare Provider Portal</p>
      </div>
    </aside>
  );
}
