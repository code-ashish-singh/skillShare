import { useState } from "react";
import { Plus, Edit, Trash2, Lightbulb } from "lucide-react";
import Modal from "../../components/common/Modal";
import { providerSkills } from "../../data/bookings";

const levelColors = { Expert: "bg-green-50 text-green-600", Advanced: "bg-blue-50 text-blue-600", Intermediate: "bg-amber-50 text-amber-600" };

export default function ProviderSkills() {
  const [skills, setSkills] = useState(providerSkills);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", category: "", experience: "", level: "Intermediate" });

  const openAdd = () => { setEditing(null); setForm({ name: "", category: "", experience: "", level: "Intermediate" }); setModal(true); };
  const openEdit = (s) => { setEditing(s.id); setForm({ name: s.name, category: s.category, experience: s.experience, level: s.level }); setModal(true); };
  const handleDelete = (id) => setSkills(prev => prev.filter(s => s.id !== id));

  const handleSave = () => {
    if (!form.name.trim()) return;
    if (editing) {
      setSkills(prev => prev.map(s => s.id === editing ? { ...s, ...form } : s));
    } else {
      setSkills(prev => [...prev, { id: Date.now(), ...form, projects: 0 }]);
    }
    setModal(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-gray-900">My Skills</h1><p className="text-gray-500 mt-1">Showcase your expertise to attract clients</p></div>
        <button onClick={openAdd} className="btn-primary flex items-center gap-2"><Plus size={16} /> Add Skill</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map(s => (
          <div key={s.id} className="card hover:shadow-lg transition-all group">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center"><Lightbulb size={20} className="text-primary" /></div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(s)} className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary-50 rounded-lg transition-all"><Edit size={15} /></button>
                <button onClick={() => handleDelete(s.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={15} /></button>
              </div>
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">{s.name}</h3>
            <p className="text-xs text-gray-400 mb-3">{s.category} • {s.experience}</p>
            <div className="flex items-center justify-between">
              <span className={`badge ${levelColors[s.level] || "bg-gray-100 text-gray-500"}`}>{s.level}</span>
              <span className="text-xs text-gray-400 font-medium">{s.projects} projects</span>
            </div>
          </div>
        ))}

        <button onClick={openAdd} className="card border-2 border-dashed border-gray-200 flex flex-col items-center justify-center min-h-[160px] hover:border-primary hover:bg-primary-50/30 transition-all group">
          <Plus size={24} className="text-gray-300 group-hover:text-primary mb-2 transition-colors" />
          <p className="text-sm font-medium text-gray-400 group-hover:text-primary">Add new skill</p>
        </button>
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} title={editing ? "Edit Skill" : "Add New Skill"}>
        <div className="space-y-4">
          {[{ k: "name", label: "Skill Name", placeholder: "e.g. React Development" }, { k: "category", label: "Category", placeholder: "e.g. Web Development" }, { k: "experience", label: "Experience", placeholder: "e.g. 3 years" }].map(({ k, label, placeholder }) => (
            <div key={k}>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
              <input value={form[k]} onChange={e => setForm(p => ({...p, [k]: e.target.value}))} placeholder={placeholder} className="input" />
            </div>
          ))}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Level</label>
            <select value={form.level} onChange={e => setForm(p => ({...p, level: e.target.value}))} className="input">
              {["Beginner", "Intermediate", "Advanced", "Expert"].map(l => <option key={l}>{l}</option>)}
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setModal(false)} className="btn-outline">Cancel</button>
            <button onClick={handleSave} className="btn-primary">{editing ? "Update" : "Add Skill"}</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
