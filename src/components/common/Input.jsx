export default function Input({ label, error, icon: Icon, className = "", ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <div className="relative">
        {Icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Icon size={16} /></span>}
        <input
          className={`w-full bg-white border rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/10 ${error ? "border-red-400 focus:border-red-400 focus:ring-red-100" : "border-gray-200 hover:border-gray-300"} ${Icon ? "pl-10" : ""} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500 flex items-center gap-1">{error}</p>}
    </div>
  );
}
