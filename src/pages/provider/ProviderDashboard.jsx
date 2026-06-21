import { useState, useEffect } from "react";
import { Briefcase, CheckCircle, Clock, AlertCircle, Star, TrendingUp, Loader } from "lucide-react";
import StatsCard from "../../components/common/StatsCard";
import Table from "../../components/common/Table";
import StatusBadge from "../../components/common/StatusBadge";
import { bookingService } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function ProviderDashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    bookingService.getProviderBookings({ limit: 8 })
      .then(res => setBookings(res.data.data || []))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, []);

  const profile = user?.providerProfile || {};

  const stats = [
    { icon: Briefcase, label: "Total Bookings", value: (profile.completedProjects || 0) + (profile.ongoingProjects || 0) + (profile.pendingProjects || 0), color: "text-primary", bg: "bg-primary-50" },
    { icon: CheckCircle, label: "Completed Projects", value: profile.completedProjects || 0, color: "text-green-600", bg: "bg-green-50" },
    { icon: Clock, label: "Ongoing Projects", value: profile.ongoingProjects || 0, color: "text-blue-600", bg: "bg-blue-50" },
    { icon: AlertCircle, label: "Pending Requests", value: profile.pendingProjects || 0, color: "text-amber-600", bg: "bg-amber-50", trend: "Needs review" },
    { icon: Star, label: "Average Rating", value: `${(profile.rating || 0).toFixed(1)}★`, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  const columns = [
    { key: "_id", label: "ID", render: (v) => <span className="text-xs font-mono text-gray-500">{v?.slice(-6).toUpperCase()}</span> },
    { key: "seeker", label: "Client", render: (v) => (
      <div className="flex items-center gap-2">
        <img src={v?.avatar || "https://i.pravatar.cc/150"} alt={v?.name} className="w-8 h-8 rounded-full object-cover" />
        <span className="text-sm font-medium text-gray-800">{v?.name}</span>
      </div>
    )},
    { key: "skill", label: "Skill", render: (v) => <span className="text-sm text-gray-600">{v?.title || "—"}</span> },
    { key: "plan", label: "Plan", render: (v) => <span className="badge bg-gray-100 text-gray-600">{v?.name || "—"}</span> },
    { key: "amount", label: "Amount", render: (v) => <span className="font-semibold text-green-600">₹{v?.toLocaleString("en-IN")}</span> },
    { key: "createdAt", label: "Date", render: (v) => <span className="text-sm text-gray-500">{new Date(v).toLocaleDateString("en-IN")}</span> },
    { key: "status", label: "Status", render: (v) => <StatusBadge status={v} /> },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name?.split(" ")[0]}! 👋</h1>
        <p className="text-gray-500 mt-1">Here's how your services are performing today.</p>
      </div>

      {/* Earnings summary */}
      <div className="card mb-6 bg-gradient-to-r from-primary to-blue-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-primary-100 text-sm font-medium">Total Earnings</p>
            <p className="text-4xl font-bold mt-1">₹{(profile.totalEarnings || 0).toLocaleString("en-IN")}</p>
            <p className="text-primary-100 text-sm mt-1 flex items-center gap-1"><TrendingUp size={14} /> {profile.completedProjects || 0} completed projects</p>
          </div>
          <div className="text-right">
            <p className="text-primary-100 text-sm">Reviews</p>
            <p className="text-2xl font-bold mt-1">{profile.totalReviews || 0}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        {stats.map(s => <StatsCard key={s.label} {...s} />)}
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-gray-800 text-lg">Recent Bookings</h2>
          <a href="/provider/bookings" className="text-sm text-primary font-semibold hover:underline">View All</a>
        </div>
        {loading ? (
          <div className="flex justify-center py-10"><Loader size={24} className="animate-spin text-primary" /></div>
        ) : (
          <Table columns={columns} data={bookings} emptyMessage="No bookings yet." />
        )}
      </div>
    </div>
  );
}
