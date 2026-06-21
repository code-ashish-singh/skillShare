import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Lightbulb, Loader } from "lucide-react";
import Modal from "../../components/common/Modal";
import { providerService } from "../../services/api";

const levelColors = { Expert: "bg-green-50 text-green-600", Advanced: "bg-blue-50 text-blue-600", Intermediate: "bg-amber-50 text-amber-600", Beginner: "bg-gray-50 text-gray-600" };
const CATEGORIES = ["Web Development", "Mobile Development", "UI/UX Design", "Graphic Design", "Content Writing", "Digital Marketing", "Data Science", "Video Production", "Photography", "Other"];

const emptyForm = { title: "", description: "", category: "Web Development", tags: "" };

export default function ProviderSkills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const res = await providerService.getMySkills();
      setSkills(res.data.data.skills || []);
    } catch {
      setError("Failed to load skills. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSkills(); }, []);

  const openAdd = () => { setEditing(null); setForm(emptyForm); setModal(true); };
  const openEdit = (s) => {
    setEditing(s._id);
    setForm({ title: s.title, description: s.description, category: s.category, tags: s.tags?.join(", ") || "" });
    setModal(true);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.description.trim()) return;
    setSaving(true);
    try {
      const payload = { ...form, tags: form.tags.split(",").map(t => t.trim()).filter(Boolean) };
      if (editing) {
        await providerService.updateSkill(editing, payload);
      } else {
        await providerService.createSkill(payload);
      }
      setModal(false);
      fetchSkills();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this skill? All associated plans will also be deleted.")) return;
    try {
      await providerService.deleteSkill(id);
      setSkills(prev => prev.filter(s => s._id !== id));
    } catch {
      alert("Failed to delete. Please try again.");
    }
  };

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-gray-900">My Skills</h1><p className="text-gray-500 mt-1">Showcase your expertise to attract clients</p></div>
        <button onClick={openAdd} className="btn-primary flex items-center gap-2"><Plus size={16} /> Add Skill</button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {loading ? (
        <div className="flex justify-center py-20"><Loader size={28} className="animate-spin text-primary" /></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map(s => (
            <div key={s._id} className="card hover:shadow-lg transition-all group">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center"><Lightbulb size={20} className="text-primary" /></div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(s)} className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary-50 rounded-lg transition-all"><Edit size={15} /></button>
                  <button onClick={() => handleDelete(s._id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={15} /></button>
                </div>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">{s.title}</h3>
              <p className="text-xs text-gray-400 mb-2">{s.category}</p>
              <p className="text-xs text-gray-500 mb-3 line-clamp-2">{s.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-primary font-semibold">₹{s.startingPrice || 0}+ starting</span>
                <span className="text-xs text-gray-400">{s.plans?.length || 0} plans</span>
              </div>
              {s.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {s.tags.slice(0, 4).map(t => <span key={t} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{t}</span>)}
                </div>
              )}
            </div>
          ))}

          <button onClick={openAdd} className="card border-2 border-dashed border-gray-200 flex flex-col items-center justify-center min-h-[160px] hover:border-primary hover:bg-primary-50/30 transition-all group">
            <Plus size={24} className="text-gray-300 group-hover:text-primary mb-2 transition-colors" />
            <p className="text-sm font-medium text-gray-400 group-hover:text-primary">Add new skill</p>
          </button>
        </div>
      )}

      <Modal isOpen={modal} onClose={() => setModal(false)} title={editing ? "Edit Skill" : "Add New Skill"}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Skill Title</label>
            <input value={form.title} onChange={e => set("title", e.target.value)} placeholder="e.g. Full Stack Web Development" className="input" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category</label>
            <select value={form.category} onChange={e => set("category", e.target.value)} className="input">
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description</label>
            <textarea value={form.description} onChange={e => set("description", e.target.value)} rows={3} placeholder="Describe your skill..." className="input resize-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tags <span className="text-gray-400 font-normal">(comma separated)</span></label>
            <input value={form.tags} onChange={e => set("tags", e.target.value)} placeholder="React, Node.js, MongoDB" className="input" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setModal(false)} className="btn-outline">Cancel</button>
            <button onClick={handleSave} disabled={saving} className="btn-primary flex items-center gap-2">
              {saving && <Loader size={14} className="animate-spin" />}
              {editing ? "Update" : "Add Skill"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
