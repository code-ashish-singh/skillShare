import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isSeeker = user?.role === "skillSeeker";
  const isProvider = user?.role === "skillProvider";

  // App open hone par current user fetch karo
  useEffect(() => {
    api.get("/auth/me")
      .then(res => setUser(res.data.data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const userData = res.data.data.user;
      setUser(userData);
      return { success: true, role: userData.role };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Login failed" };
    }
  };

  const signup = async (data) => {
    try {
      const res = await api.post("/auth/register", data);
      setUser(res.data.data.user);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Signup failed" };
    }
  };

  const logout = async () => {
    await api.post("/auth/logout");
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