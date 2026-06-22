import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Camera, Save, User, Mail, Phone, MapPin, Globe, Link2, Plus, X, Loader } from "lucide-react";

export default function ProviderProfile() {
  const { user, updateUser } = useAuth();
  const profile = user?.providerProfile || {};

  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    location: user?.location || "",
    bio: user?.bio || "",
    socialLinks: {
      website: profile.socialLinks?.website || "",
      linkedin: profile.socialLinks?.linkedin || "",
      github: profile.socialLinks?.github || "",
      twitter: profile.socialLinks?.twitter || "",
    },
    languages: profile.languages?.join(", ") || "",
    responseTime: profile.responseTime || "",
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState({ text: "", type: "" });

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg({ text: "", type: "" });
    const payload = {
      name: form.name,
      phone: form.phone,
      location: form.location,
      bio: form.bio,
      socialLinks: form.socialLinks,
      languages: form.languages.split(",").map(l => l.trim()).filter(Boolean),
      responseTime: form.responseTime,
    };
    const result = await updateUser(payload);
    setSaving(false);
    if (result?.success) {
      setMsg({ text: "Profile save ho gayi!", type: "success" });
    } else {
      setMsg({ text: result?.message || "Save nahi hua.", type: "error" });
    }
    setTimeout(() => setMsg({ text: "", type: "" }), 3000);
  };

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const setSocial = (k, v) => setForm(p => ({ ...p, socialLinks: { ...p.socialLinks, [k]: v } }));

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Provider Profile</h1>
        <p className="text-gray-500 mt-1">Keep your profile updated to attract more clients</p>
      </div>

      {/* Avatar card */}
      <div className="card mb-5 flex items-center gap-5">
        <div className="relative">
          <img src={user?.avatar || "https://i.pravatar.cc/150"} alt={user?.name} className="w-20 h-20 rounded-2xl object-cover ring-2 ring-primary/20" />
          <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-md hover:bg-primary-700">
            <Camera size={14} className="text-white" />
          </button>
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 text-lg">{user?.name}</h3>
          <p className="text-sm text-primary font-medium mt-0.5">Skill Provider</p>
          <p className="text-xs text-gray-400 mt-1">JPG, PNG or GIF — max 5MB</p>
        </div>
      </div>

      {msg.text && (
        <div className={`p-3 rounded-xl text-sm mb-4 ${msg.type === "success" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
          {msg.text}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-5">
        <div className="card">
          <h3 className="font-semibold text-gray-800 mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[{ k: "name", label: "Full Name", icon: User, type: "text" }, { k: "phone", label: "Phone", icon: Phone, type: "tel" }, { k: "location", label: "Location", icon: MapPin, type: "text" }, { k: "responseTime", label: "Response Time", icon: Link2, type: "text" }].map(({ k, label, icon: Icon, type }) => (
              <div key={k}>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
                <div className="relative"><Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type={type} value={form[k]} onChange={e => set(k, e.target.value)} className="input pl-10" />
                </div>
              </div>
            ))}
            {/* Email readonly */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
              <div className="relative"><Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" value={user?.email || ""} readOnly className="input pl-10 bg-gray-50 cursor-not-allowed text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Languages <span className="text-gray-400 font-normal">(comma separated)</span></label>
              <input value={form.languages} onChange={e => set("languages", e.target.value)} placeholder="Hindi, English" className="input" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Professional Bio</label>
              <textarea value={form.bio} onChange={e => set("bio", e.target.value)} rows={4} placeholder="Apni expertise aur experience describe karo..." className="input resize-none" />
              <p className="text-xs text-gray-400 mt-1">{form.bio.length}/500 characters</p>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="font-semibold text-gray-800 mb-4">Social Links</h3>
          <div className="space-y-3">
            {[{ k: "website", icon: Globe, ph: "https://yourwebsite.com" }, { k: "linkedin", icon: Link2, ph: "https://linkedin.com/in/username" }, { k: "github", icon: Link2, ph: "https://github.com/username" }, { k: "twitter", icon: Link2, ph: "https://twitter.com/username" }].map(({ k, icon: Icon, ph }) => (
              <div key={k} className="relative">
                <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input value={form.socialLinks[k]} onChange={e => setSocial(k, e.target.value)} placeholder={ph} className="input pl-10" />
              </div>
            ))}
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
