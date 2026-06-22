import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});

// Attach token from localStorage on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("ss_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isSeeker = user?.role === "skillSeeker";
  const isProvider = user?.role === "skillProvider";

  // App open hone par current user fetch karo
  useEffect(() => {
    const token = localStorage.getItem("ss_token");
    if (!token) { setLoading(false); return; }
    api.get("/auth/me")
      .then(res => setUser(res.data.data.user))
      .catch(() => { localStorage.removeItem("ss_token"); setUser(null); })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const userData = res.data.data.user;
      const token = res.data.data.token;
      if (token) localStorage.setItem("ss_token", token);
      setUser(userData);
      return { success: true, role: userData.role };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Login failed" };
    }
  };

  const signup = async (data) => {
    try {
      const res = await api.post("/auth/register", data);
      const userData = res.data.data.user;
      const token = res.data.data.token;
      if (token) localStorage.setItem("ss_token", token);
      setUser(userData);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Signup failed" };
    }
  };

  const logout = async () => {
    try { await api.post("/auth/logout"); } catch {}
    localStorage.removeItem("ss_token");
    setUser(null);
  };

  const updateUser = async (data) => {
    try {
      const res = await api.put("/auth/update-profile", data);
      setUser(res.data.data.user);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message };
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen"><div className="w-8 h-8 border-2 border-gray-200 border-t-primary rounded-full animate-spin"/></div>;

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateUser, isAuthenticated: !!user, isSeeker, isProvider }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};