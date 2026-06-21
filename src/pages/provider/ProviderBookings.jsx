import { useState, useEffect, useCallback } from "react";
import { Check, X, Search, Loader } from "lucide-react";
import Table from "../../components/common/Table";
import StatusBadge from "../../components/common/StatusBadge";
import { bookingService } from "../../services/api";

const statuses = ["All", "Pending", "Accepted", "Completed", "Cancelled"];

export default function ProviderBookings() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const params = { limit: 50 };
      if (filter !== "All") params.status = filter;
      const res = await bookingService.getProviderBookings(params);
      setBookings(res.data.data || []);
    } catch {
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  const updateStatus = async (id, status) => {
    setActionLoading(id + status);
    try { await bookingService.updateStatus(id, status);
      fetchBookings();
    } catch { alert("Failed to update status."); }
    setActionLoading(null);
  };

  const filtered = bookings.filter(b =>
    !search ||
    b.seeker?.name?.toLowerCase().includes(search.toLowerCase()) ||
    b.skill?.title?.toLowerCase().includes(search.toLowerCase())
  );

  const counts = statuses.slice(1).reduce((acc, s) => ({
    ...acc, [s]: bookings.filter(b => b.status === s).length
  }), {});

  const columns = [
    { key: "_id", label: "ID", render: (v) => <span className="text-xs font-mono text-gray-400">{v?.slice(-6).toUpperCase()}</span> },
    { key: "seeker", label: "Client", render: (v) => (
      <div className="flex items-center gap-2.5">
        <img src={v?.avatar || "https://i.pravatar.cc/150"} alt={v?.name} className="w-8 h-8 rounded-full object-cover" />
        <div>
          <p className="font-medium text-gray-800 text-sm">{v?.name}</p>
          <p className="text-xs text-gray-400">{v?.email}</p>
        </div>
      </div>
    )},
    { key: "skill", label: "Skill", render: (v) => <span className="text-sm text-gray-600">{v?.title || "—"}</span> },
    { key: "plan", label: "Plan", render: (v) => <span className="badge bg-gray-100 text-gray-600">{v?.name || "—"}</span> },
    { key: "amount", label: "Amount", render: (v) => <span className="font-bold text-green-600">₹{v?.toLocaleString("en-IN")}</span> },
    { key: "createdAt", label: "Date", render: (v) => <span className="text-sm text-gray-500">{new Date(v).toLocaleDateString("en-IN")}</span> },
    { key: "status", label: "Status", render: (v) => <StatusBadge status={v} /> },
    { key: "_id", label: "Actions", render: (id, row) => (
      <div className="flex gap-1">
        {row.status === "Pending" && (
          <>
            <button onClick={() => updateStatus(id, "Accepted")} disabled={!!actionLoading} className="p-1.5 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg transition-colors" title="Accept">
              {actionLoading === id + "Accepted" ? <Loader size={14} className="animate-spin" /> : <Check size={14} />}
            </button>
            <button onClick={() => updateStatus(id, "Cancelled")} disabled={!!actionLoading} className="p-1.5 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg transition-colors" title="Decline">
              <X size={14} />
            </button>
          </>
        )}
        {row.status === "Accepted" && (
          <button onClick={() => updateStatus(id, "Completed")} disabled={!!actionLoading} className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-semibold transition-colors px-2">
            {actionLoading === id + "Completed" ? "..." : "Done"}
          </button>
        )}
      </div>
    )},
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
        <p className="text-gray-500 mt-1">Manage client booking requests</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[{ label: "Pending", color: "text-amber-600", bg: "bg-amber-50" }, { label: "Accepted", color: "text-blue-600", bg: "bg-blue-50" }, { label: "Completed", color: "text-green-600", bg: "bg-green-50" }, { label: "Cancelled", color: "text-red-500", bg: "bg-red-50" }].map(({ label, color, bg }) => (
          <div key={label} onClick={() => setFilter(label)} className={`card text-center cursor-pointer hover:shadow-lg transition-all ${filter === label ? "ring-2 ring-primary" : ""}`}>
            <p className={`text-2xl font-bold ${color}`}>{counts[label] || 0}</p>
            <p className="text-xs text-gray-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1 max-w-xs">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search bookings..." className="input pl-9 h-9 text-sm" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {statuses.map(s => (
              <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${filter === s ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{s}</button>
            ))}
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center py-10"><Loader size={24} className="animate-spin text-primary" /></div>
        ) : (
          <Table columns={columns} data={filtered} emptyMessage="No bookings found." />
        )}
      </div>
    </div>
  );
}
