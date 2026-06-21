import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Code2, Loader } from "lucide-react";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import Input from "../../components/common/Input";
import { providerService } from "../../services/api";

const skillCategories = ["Web Development", "Mobile Development", "UI/UX Design", "Graphic Design", "Content Writing", "Digital Marketing", "Database", "DevOps", "Other"];

const emptyForm = { title: "", category: "Web Development", description: "", tags: "" };

export default function ProviderSkillsPage() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteModal, setDeleteModal] = useState(null);

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const res = await providerService.getMySkills();
      setSkills(res.data.data.skills || []);
    } catch {}
    finally { setLoading(false); }
  };

  useEffect(() => { fetchSkills(); }, []);

  const openAdd = () => { setEditing(null); setForm(emptyForm); setModal(true); };
  const openEdit = (skill) => { setEditing(skill._id); setForm({ title: skill.title, category: skill.category, description: skill.description, tags: skill.tags?.join(", ") || "" }); setModal(true); };

  const handleSave = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    try {
      const payload = { ...form, tags: form.tags.split(",").map(t => t.trim()).filter(Boolean) };
      if (editing) { await providerService.updateSkill(editing, payload); }
      else { await providerService.createSkill(payload); }
      setModal(false);
      fetchSkills();
    } catch (err) { alert(err.response?.data?.message || "Save nahi hua."); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    try { await providerService.deleteSkill(id); setSkills(prev => prev.filter(s => s._id !== id)); }
    catch { alert("Delete nahi hua."); }
    setDeleteModal(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Skills</h1>
          <p className="text-gray-500 mt-0.5">Manage your skills to attract the right clients.</p>
        </div>
        <Button icon={Plus} onClick={openAdd}>Add Skill</Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader size={28} className="animate-spin text-primary" /></div>
      ) : skills.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
          <Code2 size={40} className="mx-auto text-gray-300 mb-4" />
          <h3 className="font-semibold text-gray-700 mb-2">No skills added yet</h3>
          <p className="text-gray-400 text-sm mb-4">Add your skills to showcase your expertise.</p>
          <Button onClick={openAdd} icon={Plus}>Add Your First Skill</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill) => (
            <div key={skill._id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-card hover:shadow-soft transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center">
                  <Code2 size={18} className="text-primary" />
                </div>
                <div className="flex gap-1.5">
                  <button onClick={() => openEdit(skill)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-700"><Edit2 size={14} /></button>
                  <button onClick={() => setDeleteModal(skill._id)} className="p-2 hover:bg-red-50 rounded-lg transition-colors text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
                </div>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{skill.title}</h3>
              <p className="text-xs text-gray-400 mb-3">{skill.category}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-primary font-semibold">₹{skill.startingPrice || 0}+ starting</span>
                <p className="text-xs font-medium text-gray-700">{skill.completedProjects || 0} projects</p>
              </div>
              {skill.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {skill.tags.slice(0, 3).map(t => <span key={t} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{t}</span>)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={modal} onClose={() => setModal(false)} title={editing ? "Edit Skill" : "Add New Skill"} size="sm">
        <div className="space-y-4">
          <Input label="Skill Title" placeholder="e.g. React.js Development" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} />
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">Category</label>
            <select value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary bg-white">
              {skillCategories.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">Description</label>
            <textarea value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} rows={3} placeholder="Apni skill ke baare mein batao..." className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary resize-none" />
          </div>
          <Input label="Tags (comma separated)" placeholder="React, Node.js, MongoDB" value={form.tags} onChange={(e) => setForm((p) => ({ ...p, tags: e.target.value }))} />
          <div className="flex gap-3 pt-2">
            <Button variant="outline" fullWidth onClick={() => setModal(false)}>Cancel</Button>
            <Button fullWidth onClick={handleSave} disabled={saving}>
              {saving ? <Loader size={14} className="animate-spin inline mr-1" /> : null}
              {editing ? "Save Changes" : "Add Skill"}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal isOpen={!!deleteModal} onClose={() => setDeleteModal(null)} title="Delete Skill" size="sm">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto"><Trash2 size={20} className="text-red-500" /></div>
          <p className="text-gray-600 text-sm">Are you sure you want to delete this skill? This action cannot be undone.</p>
          <div className="flex gap-3">
            <Button variant="outline" fullWidth onClick={() => setDeleteModal(null)}>Cancel</Button>
            <Button variant="danger" fullWidth onClick={() => handleDelete(deleteModal)}>Delete</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
