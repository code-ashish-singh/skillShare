import { useState, useEffect } from "react";
import { bookingService } from "../../services/api";
import Table from "../../components/common/Table";
import StatusBadge from "../../components/common/StatusBadge";
import { Search, Loader } from "lucide-react";

const statuses = ["All", "Pending", "Accepted", "Completed", "Cancelled"];

const STAT_COLORS = {
  Pending: "text-amber-600 bg-amber-50",
  Accepted: "text-blue-600 bg-blue-50",
  Completed: "text-green-600 bg-green-50",
  Cancelled: "text-red-500 bg-red-50",
};

export default function SeekerBookings() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await bookingService.getMyBookings();
        setBookings(res.data.data || []);
      } catch {
        setError("Failed to load bookings. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const filtered = bookings.filter(b =>
    (filter === "All" || b.status === filter) &&
    (!search || b.provider?.name?.toLowerCase().includes(search.toLowerCase()))
  );

  const columns = [
    {
      key: "_id",
      label: "Booking ID",
      render: (v) => <span className="text-xs font-mono text-gray-400">{v?.slice(-8).toUpperCase()}</span>,
    },
    {
      key: "provider",
      label: "Provider",
      render: (v) => (
        <div className="flex items-center gap-2">
          <img src={v?.avatar || "https://i.pravatar.cc/150"} alt={v?.name} className="w-8 h-8 rounded-full object-cover" />
          <div>
            <p className="text-sm font-medium text-gray-800">{v?.name}</p>
            <p className="text-xs text-gray-400">{v?.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "skill",
      label: "Skill",
      render: (v) => <span className="text-sm text-gray-700">{v?.title || "—"}</span>,
    },
    {
      key: "plan",
      label: "Plan",
      render: (v) => <span className="badge bg-gray-100 text-gray-600 text-xs">{v?.name || "—"}</span>,
    },
    {
      key: "amount",
      label: "Amount",
      render: (v) => <span className="font-semibold text-primary">₹{v?.toLocaleString("en-IN")}</span>,
    },
    {
      key: "createdAt",
      label: "Booked On",
      render: (v) => <span className="text-sm text-gray-500">{new Date(v).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (v) => <StatusBadge status={v} />,
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
        <p className="text-gray-500 mt-1">Track all your project bookings</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {statuses.slice(1).map(s => {
          const count = bookings.filter(b => b.status === s).length;
          const [textColor, bgColor] = STAT_COLORS[s].split(" ");
          return (
            <div key={s} className="card text-center cursor-pointer hover:shadow-lg transition-all" onClick={() => setFilter(s)}>
              <p className={`text-2xl font-bold ${textColor}`}>{count}</p>
              <p className="text-xs text-gray-500 mt-1">{s}</p>
            </div>
          );
        })}
      </div>

      <div className="card">
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1 max-w-xs">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search provider..." className="input pl-9 h-9 text-sm" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {statuses.map(s => (
              <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${filter === s ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{s}</button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-16"><Loader size={28} className="animate-spin text-primary" /></div>
        ) : error ? (
          <p className="text-center text-red-500 py-10">{error}</p>
        ) : (
          <Table columns={columns} data={filtered} emptyMessage="No bookings found." />
        )}
      </div>
    </div>
  );
}
