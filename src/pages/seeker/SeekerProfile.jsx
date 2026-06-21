import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Camera, Save, User, Mail, Phone, MapPin, Loader } from "lucide-react";

export default function SeekerProfile() {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    location: user?.location || "",
    bio: user?.bio || "",
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState({ text: "", type: "" });

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg({ text: "", type: "" });
    const result = await updateUser(form);
    if (result?.success) {
      setMsg({ text: "Profile saved successfully!", type: "success" });
    } else {
      setMsg({ text: result?.message || "Failed to save. Please try again.", type: "error" });
    }
    setSaving(false);
    setTimeout(() => setMsg({ text: "", type: "" }), 3000);
  };

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-500 mt-1">Manage your personal information</p>
      </div>

      {/* Avatar */}
      <div className="card mb-6 flex items-center gap-6">
        <div className="relative">
          <img
            src={user?.avatar || "https://i.pravatar.cc/150"}
            alt={user?.name}
            className="w-20 h-20 rounded-2xl object-cover"
          />
          <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-md hover:bg-primary-700 transition-colors">
            <Camera size={14} className="text-white" />
          </button>
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">{user?.name}</h3>
          <p className="text-sm text-gray-400 mt-0.5">Skill Seeker</p>
          <p className="text-xs text-gray-400 mt-1">{user?.email}</p>
        </div>
      </div>

      {msg.text && (
        <div className={`p-3 rounded-xl text-sm mb-4 ${msg.type === "success" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
          {msg.text}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-5">
        <div className="card">
          <h3 className="font-semibold text-gray-800 mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { k: "name", label: "Full Name", icon: User, type: "text", placeholder: "Your name" },
              { k: "phone", label: "Phone", icon: Phone, type: "tel", placeholder: "+91 98xxx xxxxx" },
              { k: "location", label: "Location", icon: MapPin, type: "text", placeholder: "City, State" },
            ].map(({ k, label, icon: Icon, type, placeholder }) => (
              <div key={k}>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
                <div className="relative">
                  <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type={type} value={form[k]} onChange={e => set(k, e.target.value)} placeholder={placeholder} className="input pl-10" />
                </div>
              </div>
            ))}

            {/* Email — readonly */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" value={user?.email || ""} readOnly className="input pl-10 bg-gray-50 cursor-not-allowed text-gray-400" />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Bio</label>
              <textarea
                value={form.bio}
                onChange={e => set("bio", e.target.value)}
                rows={3}
                placeholder="Tell providers about yourself..."
                className="input resize-none"
              />
            </div>
          </div>
        </div>

        <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2 px-8">
          {saving ? <Loader size={16} className="animate-spin" /> : <Save size={16} />}
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
