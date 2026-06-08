export default function StatsCard({ icon: Icon, label, value, color = "text-primary", bg = "bg-primary-50", trend }) {
  return (
    <div className="card flex items-center gap-4">
      <div className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center flex-shrink-0`}>
        <Icon size={22} className={color} />
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        <p className="text-2xl font-bold text-gray-800 mt-0.5">{value}</p>
        {trend && <p className="text-xs text-green-500 mt-0.5 font-medium">{trend}</p>}
      </div>
    </div>
  );
}
