import { Briefcase, CheckCircle, Clock, AlertCircle, Star, TrendingUp } from "lucide-react";
import StatsCard from "../../components/common/StatsCard";
import Table from "../../components/common/Table";
import StatusBadge from "../../components/common/StatusBadge";
import { providerBookings } from "../../data/bookings";
import { useAuth } from "../../context/AuthContext";

export default function ProviderDashboard() {
  const { user } = useAuth();
  const stats = [
    { icon: Briefcase, label: "Total Bookings", value: providerBookings.length, color: "text-primary", bg: "bg-primary-50", trend: "+12% this month" },
    { icon: CheckCircle, label: "Completed Projects", value: 94, color: "text-green-600", bg: "bg-green-50", trend: "+8 this week" },
    { icon: Clock, label: "Ongoing Projects", value: 3, color: "text-blue-600", bg: "bg-blue-50" },
    { icon: AlertCircle, label: "Pending Requests", value: 5, color: "text-amber-600", bg: "bg-amber-50", trend: "Needs review" },
    { icon: Star, label: "Average Rating", value: "4.9★", color: "text-purple-600", bg: "bg-purple-50" },
  ];

  const columns = [
    { key: "id", label: "ID", render: (v) => <span className="text-xs font-mono text-gray-500">{v}</span> },
    { key: "seeker", label: "Client", render: (v) => (
      <div className="flex items-center gap-2">
        <img src={v.avatar} alt={v.name} className="w-8 h-8 rounded-full object-cover" />
        <span className="text-sm font-medium text-gray-800">{v.name}</span>
      </div>
    )},
    { key: "service", label: "Service" },
    { key: "plan", label: "Plan", render: (v) => <span className="badge bg-gray-100 text-gray-600">{v}</span> },
    { key: "amount", label: "Amount", render: (v) => <span className="font-semibold text-green-600">${v}</span> },
    { key: "date", label: "Date" },
    { key: "status", label: "Status", render: (v) => <StatusBadge status={v} /> },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name?.split(" ")[0]}! 👋</h1>
        <p className="text-gray-500 mt-1">Here's what's happening with your services today.</p>
      </div>

      {/* Earning summary */}
      <div className="card mb-6 bg-gradient-to-r from-primary to-blue-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-primary-100 text-sm font-medium">Total Earnings</p>
            <p className="text-4xl font-bold mt-1">$8,240</p>
            <p className="text-primary-100 text-sm mt-1 flex items-center gap-1"><TrendingUp size={14} /> +24% from last month</p>
          </div>
          <div className="text-right">
            <p className="text-primary-100 text-sm">This Month</p>
            <p className="text-2xl font-bold mt-1">$1,840</p>
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
        <Table columns={columns} data={providerBookings} />
      </div>
    </div>
  );
}
