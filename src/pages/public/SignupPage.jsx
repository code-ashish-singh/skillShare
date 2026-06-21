import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Zap, User, Mail, Lock, Briefcase, Search } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "", role: "seeker" });
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.includes("@")) e.email = "Valid email required";
    if (form.password.length < 6) e.password = "Password must be 6+ characters";
    if (form.password !== form.confirm) e.confirm = "Passwords do not match";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    const result = await signup({
      name: form.name,
      email: form.email,
      password: form.password,
      role: form.role === "provider" ? "skillProvider" : "skillSeeker",
    });
    if (result.success) navigate(form.role === "provider" ? "/provider/dashboard" : "/");
    else setErrors({ submit: result.message });
  };

  const set = (k, v) => { setForm(p => ({...p, [k]: v})); setErrors(p => ({...p, [k]: ""})); };

  return (
    <div className="min-h-[calc(100vh-64px)] grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:flex flex-col items-center justify-center p-12 text-white" style={{background: "linear-gradient(135deg, #1D4ED8 0%, #3B82F6 100%)"}}>
        <div className="max-w-sm text-center">
          <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-8"><Zap size={36} /></div>
          <h2 className="text-3xl font-bold mb-4">Join SkillShare today</h2>
          <p className="text-blue-100 text-lg leading-relaxed">Whether you're looking for talent or ready to share yours — you're in the right place.</p>
          <div className="mt-10 space-y-4">
            {["Create a free account in seconds", "Access 2,400+ skilled professionals", "Secure bookings with payment protection", "Rate and review every project"].map(t => (
              <div key={t} className="flex items-center gap-3 text-left bg-white/10 rounded-xl p-3"><div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0"><span className="text-white text-xs font-bold">✓</span></div><p className="text-sm">{t}</p></div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center p-6 lg:p-12 bg-white">
        <div className="w-full max-w-sm">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create account</h1>
          <p className="text-gray-500 mb-6">Already a member? <Link to="/login" className="text-primary font-semibold hover:underline">Sign in</Link></p>

          {/* Role selector */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[{ value: "seeker", icon: Search, label: "Skill Seeker", desc: "Hire talent" }, { value: "provider", icon: Briefcase, label: "Skill Provider", desc: "Offer services" }].map(({ value, icon: Icon, label, desc }) => (
              <button key={value} type="button" onClick={() => set("role", value)} className={`p-4 rounded-xl border-2 text-left transition-all ${form.role === value ? "border-primary bg-primary-50" : "border-gray-200 hover:border-gray-300"}`}>
                <Icon size={20} className={form.role === value ? "text-primary" : "text-gray-400"} />
                <p className={`font-semibold text-sm mt-2 ${form.role === value ? "text-primary" : "text-gray-700"}`}>{label}</p>
                <p className="text-xs text-gray-400">{desc}</p>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.submit && <p className="text-sm text-red-500 bg-red-50 p-3 rounded-xl">{errors.submit}</p>}
            {[{ k: "name", label: "Full Name", icon: User, type: "text", placeholder: "John Doe" }, { k: "email", label: "Email", icon: Mail, type: "email", placeholder: "john@example.com" }].map(({ k, label, icon: Icon, type, placeholder }) => (
              <div key={k}>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
                <div className="relative"><Icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type={type} value={form[k]} onChange={e => set(k, e.target.value)} placeholder={placeholder} className={`input pl-10 ${errors[k] ? "border-red-400" : ""}`} />
                </div>
                {errors[k] && <p className="text-xs text-red-500 mt-1">{errors[k]}</p>}
              </div>
            ))}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <div className="relative"><Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type={showPw ? "text" : "password"} value={form.password} onChange={e => set("password", e.target.value)} placeholder="Min 6 characters" className={`input pl-10 pr-10 ${errors.password ? "border-red-400" : ""}`} />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{showPw ? <EyeOff size={16} /> : <Eye size={16} />}</button>
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Confirm Password</label>
              <div className="relative"><Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="password" value={form.confirm} onChange={e => set("confirm", e.target.value)} placeholder="Repeat password" className={`input pl-10 ${errors.confirm ? "border-red-400" : ""}`} />
              </div>
              {errors.confirm && <p className="text-xs text-red-500 mt-1">{errors.confirm}</p>}
            </div>
            <button type="submit" className="btn-primary w-full py-3 text-base mt-2">Create Account</button>
          </form>
          <p className="text-center text-xs text-gray-400 mt-5">By signing up, you agree to our <a href="#" className="text-primary">Terms</a> and <a href="#" className="text-primary">Privacy Policy</a></p>
        </div>
      </div>
    </div>
  );
}
