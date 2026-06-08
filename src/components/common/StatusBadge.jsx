const statusConfig = {
  Pending: "bg-amber-50 text-amber-600",
  Accepted: "bg-blue-50 text-blue-600",
  Ongoing: "bg-blue-50 text-blue-600",
  Completed: "bg-green-50 text-green-600",
  Cancelled: "bg-red-50 text-red-600",
};

export default function StatusBadge({ status }) {
  return (
    <span className={`badge ${statusConfig[status] || "bg-gray-100 text-gray-500"}`}>{status}</span>
  );
}
