import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Camera, Save, User, Mail, Phone, MapPin, Globe, Link2, Plus, X } from "lucide-react";

export default function ProviderProfile() {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "", email: user?.email || "", phone: user?.phone || "",
    location: user?.location || "", bio: user?.bio || "",
    website: "", twitter: "", linkedin: "", github: "",
  });
  const [skills, setSkills] = useState(["React", "Node.js", "PostgreSQL", "AWS", "Docker"]);
  const [newSkill, setNewSkill] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateUser(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills(prev => [...prev, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Provider Profile</h1>
        <p className="text-gray-500 mt-1">Keep your profile updated to attract more clients</p>
      </div>

      {/* Avatar card */}
      <div className="card mb-5 flex items-center gap-5">
        <div className="relative">
          <img src={user?.avatar} alt={user?.name} className="w-20 h-20 rounded-2xl object-cover ring-2 ring-primary/20" />
          <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-md hover:bg-primary-700">
            <Camera size={14} className="text-white" />
          </button>
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 text-lg">{user?.name}</h3>
          <p className="text-sm text-primary font-medium mt-0.5">Skill Provider</p>
          <p className="text-xs text-gray-400 mt-1">JPG, PNG or GIF — max 5MB</p>
          <button className="text-xs text-primary font-semibold hover:underline mt-1">Change photo</button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        <div className="card">
          <h3 className="font-semibold text-gray-800 mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[{ k: "name", label: "Full Name", icon: User, type: "text", span: false }, { k: "email", label: "Email", icon: Mail, type: "email", span: false }, { k: "phone", label: "Phone", icon: Phone, type: "tel", span: false }, { k: "location", label: "Location", icon: MapPin, type: "text", span: false }].map(({ k, label, icon: Icon, type }) => (
              <div key={k}>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
                <div className="relative"><Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type={type} value={form[k]} onChange={e => set(k, e.target.value)} className="input pl-10" />
                </div>
              </div>
            ))}
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Professional Bio</label>
              <textarea value={form.bio} onChange={e => set("bio", e.target.value)} rows={4} placeholder="Describe your expertise, experience, and what makes you unique..." className="input resize-none" />
              <p className="text-xs text-gray-400 mt-1">{form.bio.length}/500 characters</p>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="font-semibold text-gray-800 mb-4">Skills</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {skills.map(s => (
              <span key={s} className="flex items-center gap-1 px-3 py-1.5 bg-primary-50 text-primary rounded-lg text-sm font-medium">
                {s}
                <button type="button" onClick={() => setSkills(prev => prev.filter(x => x !== s))} className="hover:text-red-500 transition-colors"><X size={12} /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={newSkill} onChange={e => setNewSkill(e.target.value)} onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addSkill())} placeholder="Add a skill..." className="input flex-1 text-sm" />
            <button type="button" onClick={addSkill} className="btn-outline px-4"><Plus size={16} /></button>
          </div>
        </div>

        <div className="card">
          <h3 className="font-semibold text-gray-800 mb-4">Social Links</h3>
          <div className="space-y-3">
            {[{ k: "website", icon: Globe, ph: "https://yourwebsite.com" }, { k: "twitter", icon: Link2, ph: "https://twitter.com/username" }, { k: "linkedin", icon: Link2, ph: "https://linkedin.com/in/username" }, { k: "github", icon: Link2, ph: "https://github.com/username" }].map(({ k, icon: Icon, ph }) => (
              <div key={k} className="relative">
                <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input value={form[k]} onChange={e => set(k, e.target.value)} placeholder={ph} className="input pl-10" />
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="btn-primary flex items-center gap-2 px-8">
          <Save size={16} /> {saved ? "✓ Saved!" : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
