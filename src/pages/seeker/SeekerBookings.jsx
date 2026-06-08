import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { seekerBookings } from "../../data/bookings";
import Table from "../../components/common/Table";
import StatusBadge from "../../components/common/StatusBadge";
import { Calendar, Search } from "lucide-react";

const statuses = ["All", "Pending", "Ongoing", "Completed", "Cancelled"];

export default function SeekerBookings() {
  const { user } = useAuth();
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = seekerBookings.filter(b =>
    (filter === "All" || b.status === filter) &&
    (!search || b.provider.name.toLowerCase().includes(search.toLowerCase()))
  );

  const columns = [
    { key: "id", label: "Booking ID" },
    { key: "provider", label: "Provider", render: (v) => (
      <div className="flex items-center gap-2">
        <img src={v.avatar} alt={v.name} className="w-8 h-8 rounded-full object-cover" />
        <div><p className="text-sm font-medium text-gray-800">{v.name}</p><p className="text-xs text-gray-400">{v.skill}</p></div>
      </div>
    )},
    { key: "plan", label: "Plan" },
    { key: "amount", label: "Amount", render: (v) => <span className="font-semibold text-primary">${v}</span> },
    { key: "date", label: "Booked On" },
    { key: "deliveryDate", label: "Delivery" },
    { key: "status", label: "Status", render: (v) => <StatusBadge status={v} /> },
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
          const count = seekerBookings.filter(b => b.status === s).length;
          const colors = { Pending: "text-amber-600 bg-amber-50", Ongoing: "text-blue-600 bg-blue-50", Completed: "text-green-600 bg-green-50", Cancelled: "text-red-500 bg-red-50" };
          return (
            <div key={s} className="card text-center cursor-pointer hover:shadow-lg transition-all" onClick={() => setFilter(s)}>
              <p className={`text-2xl font-bold ${colors[s].split(" ")[0]}`}>{count}</p>
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
        <Table columns={columns} data={filtered} emptyMessage="No bookings found." />
      </div>
    </div>
  );
}
