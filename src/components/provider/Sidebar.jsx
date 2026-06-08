import { NavLink } from "react-router-dom";
import { LayoutDashboard, Lightbulb, DollarSign, Calendar, User, Zap } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { to: "/provider/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/provider/skills", icon: Lightbulb, label: "My Skills" },
  { to: "/provider/plans", icon: DollarSign, label: "Pricing Plans" },
  { to: "/provider/bookings", icon: Calendar, label: "Bookings" },
  { to: "/provider/profile", icon: User, label: "Profile" },
];

export default function Sidebar() {
  const { user } = useAuth();
  return (
    <aside className="w-64 bg-white border-r border-gray-100 min-h-[calc(100vh-64px)] flex flex-col flex-shrink-0">
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <img src={user?.avatar} alt={user?.name} className="w-10 h-10 rounded-xl object-cover" />
          <div>
            <p className="font-semibold text-gray-800 text-sm">{user?.name}</p>
            <p className="text-xs text-primary font-medium">Skill Provider</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-3">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to} className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium mb-1 transition-all ${isActive ? "bg-primary text-white shadow-lg" : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"}`
          }>
            <Icon size={18} /> {label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4">
        <div className="bg-primary-50 rounded-2xl p-4 text-center">
          <Zap size={20} className="text-primary mx-auto mb-2" />
          <p className="text-xs font-semibold text-gray-700">Upgrade to Pro</p>
          <p className="text-xs text-gray-500 mt-1">Get featured placement</p>
          <button className="mt-3 btn-primary text-xs w-full py-2">Upgrade Now</button>
        </div>
      </div>
    </aside>
  );
}
