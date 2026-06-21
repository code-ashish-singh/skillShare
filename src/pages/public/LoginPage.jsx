import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Zap, Mail, Lock, AlertCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError("");
    const result = await login(form.email, form.password);
    if (result.success) {
      navigate(result.role === "skillProvider" ? "/provider/dashboard" : "/");
    } else {
      setError(result.message || "Login failed");
    }
    setLoading(false);
  };

  const demoLogin = async (role) => {
    const creds = role === "seeker" ? { email: "seeker@demo.com", password: "demo123" } : { email: "provider@demo.com", password: "demo123" };
    const result = await login(creds.email, creds.password);
    if (result.success) navigate(role === "seeker" ? "/" : "/provider/dashboard");
  };

  return (
    <div className="min-h-[calc(100vh-64px)] grid grid-cols-1 md:grid-cols-2">
      {/* Left illustration */}
      <div className="hidden md:flex flex-col items-center justify-center p-12 text-white" style={{background: "linear-gradient(135deg, #1D4ED8 0%, #3B82F6 100%)"}}>
        <div className="max-w-sm text-center">
          <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-8"><Zap size={36} /></div>
          <h2 className="text-3xl font-bold mb-4">Welcome back to SkillShare</h2>
          <p className="text-blue-100 text-lg leading-relaxed">Connect with the world's best skill providers and get your projects done faster.</p>
          <div className="mt-10 grid grid-cols-2 gap-4 text-center">
            {[["2,400+", "Providers"], ["18K+", "Projects"], ["4.8★", "Rating"], ["98%", "Happy"]].map(([v, l]) => (
              <div key={l} className="bg-white/10 rounded-2xl p-4"><p className="text-2xl font-bold">{v}</p><p className="text-blue-100 text-sm">{l}</p></div>
            ))}
          </div>
        </div>
      </div>
      {/* Right form */}
      <div className="flex items-center justify-center p-6 lg:p-12 bg-white">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-2 font-bold text-xl text-primary mb-8 lg:hidden">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center"><Zap size={16} className="text-white" /></div> SkillShare
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign in</h1>
          <p className="text-gray-500 mb-8">Enter your credentials to continue</p>

          {/* Demo btns */}
          <div className="flex gap-2 mb-6">
            <button onClick={() => demoLogin("seeker")} className="flex-1 text-xs bg-blue-50 text-blue-600 font-semibold px-3 py-2 rounded-xl hover:bg-blue-100 transition-colors">Demo Seeker</button>
            <button onClick={() => demoLogin("provider")} className="flex-1 text-xs bg-purple-50 text-purple-600 font-semibold px-3 py-2 rounded-xl hover:bg-purple-100 transition-colors">Demo Provider</button>
          </div>

          <div className="relative mb-6"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div><div className="relative flex justify-center"><span className="bg-white px-3 text-xs text-gray-400">or sign in manually</span></div></div>

          {error && <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-xl mb-4"><AlertCircle size={16} />{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
              <div className="relative"><Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" value={form.email} onChange={e => setForm(p => ({...p, email: e.target.value}))} placeholder="you@example.com" required className="input pl-10" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <div className="relative"><Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type={showPw ? "text" : "password"} value={form.password} onChange={e => setForm(p => ({...p, password: e.target.value}))} placeholder="Enter password" required className="input pl-10 pr-10" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">{showPw ? <EyeOff size={16} /> : <Eye size={16} />}</button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base mt-2">{loading ? "Signing in..." : "Sign In"}</button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-6">Don't have an account? <Link to="/signup" className="text-primary font-semibold hover:underline">Sign up free</Link></p>
        </div>
      </div>
    </div>
  );
}
