const variants = {
  primary: "bg-primary text-white hover:bg-primary-700 shadow-sm hover:shadow-md",
  secondary: "bg-white text-primary border border-primary hover:bg-primary-50",
  ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
  danger: "bg-red-500 text-white hover:bg-red-600 shadow-sm",
  outline: "border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export default function Button({ children, variant = "primary", size = "md", className = "", loading = false, icon: Icon, iconPosition = "left", fullWidth = false, ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : Icon && iconPosition === "left" ? (
        <Icon size={16} />
      ) : null}
      {children}
      {!loading && Icon && iconPosition === "right" ? <Icon size={16} /> : null}
    </button>
  );
}
