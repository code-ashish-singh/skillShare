import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Camera, Save, User, Mail, Phone, MapPin, Globe, Twitter, Linkedin } from "lucide-react";

export default function SeekerProfile() {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "", phone: user?.phone || "", location: user?.location || "", bio: user?.bio || "", website: "", twitter: "", linkedin: "" });
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateUser(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const set = (k, v) => setForm(p => ({...p, [k]: v}));

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-500 mt-1">Manage your personal information</p>
      </div>

      {/* Avatar */}
      <div className="card mb-6 flex items-center gap-6">
        <div className="relative">
          <img src={user?.avatar} alt={user?.name} className="w-20 h-20 rounded-2xl object-cover" />
          <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-md hover:bg-primary-700 transition-colors">
            <Camera size={14} className="text-white" />
          </button>
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">{user?.name}</h3>
          <p className="text-sm text-gray-400 capitalize mt-0.5">{user?.role}</p>
          <p className="text-xs text-primary mt-1 font-medium cursor-pointer hover:underline">Upload new photo</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        <div className="card">
          <h3 className="font-semibold text-gray-800 mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[{ k: "name", label: "Full Name", icon: User, type: "text" }, { k: "email", label: "Email", icon: Mail, type: "email" }, { k: "phone", label: "Phone", icon: Phone, type: "tel" }, { k: "location", label: "Location", icon: MapPin, type: "text" }].map(({ k, label, icon: Icon, type }) => (
              <div key={k}>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
                <div className="relative"><Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type={type} value={form[k]} onChange={e => set(k, e.target.value)} className="input pl-10" />
                </div>
              </div>
            ))}
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Bio</label>
              <textarea value={form.bio} onChange={e => set("bio", e.target.value)} rows={3} placeholder="Tell providers about yourself..." className="input resize-none" />
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="font-semibold text-gray-800 mb-4">Social Links</h3>
          <div className="space-y-3">
            {[{ k: "website", icon: Globe, placeholder: "https://yourwebsite.com" }, { k: "twitter", icon: Twitter, placeholder: "https://twitter.com/username" }, { k: "linkedin", icon: Linkedin, placeholder: "https://linkedin.com/in/username" }].map(({ k, icon: Icon, placeholder }) => (
              <div key={k} className="relative"><Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input value={form[k]} onChange={e => set(k, e.target.value)} placeholder={placeholder} className="input pl-10" />
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="btn-primary flex items-center gap-2 px-8">
          <Save size={16} /> {saved ? "Saved!" : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
