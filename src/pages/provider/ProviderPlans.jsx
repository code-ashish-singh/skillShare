import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Check, Loader } from "lucide-react";
import Modal from "../../components/common/Modal";
import { providerService } from "../../services/api";

const emptyForm = { name: "Basic", description: "", price: "", deliveryTime: "", revisions: "", features: "" };

export default function ProviderPlans() {
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    providerService.getMySkills()
      .then(res => {
        const sk = res.data.data.skills || [];
        setSkills(sk);
        if (sk.length > 0) {
          setSelectedSkill(sk[0]);
          setPlans(sk[0].plans || []);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSkillChange = (skillId) => {
    const sk = skills.find(s => s._id === skillId);
    setSelectedSkill(sk);
    setPlans(sk?.plans || []);
  };

  const openAdd = () => { setEditing(null); setForm(emptyForm); setModal(true); };
  const openEdit = (p) => {
    setEditing(p._id);
    setForm({ name: p.name, description: p.description || "", price: p.price, deliveryTime: p.deliveryTime, revisions: p.revisions, features: p.features?.join("\n") || "" });
    setModal(true);
  };

  const handleSave = async () => {
    if (!form.price || !selectedSkill) return;
    setSaving(true);
    try {
      const payload = {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        deliveryTime: form.deliveryTime,
        revisions: form.revisions,
        features: form.features.split("\n").map(f => f.trim()).filter(Boolean),
      };
      if (editing) {
        await providerService.updatePlan(editing, payload);
      } else {
        await providerService.createPlan(selectedSkill._id, payload);
      }
      // Refresh skill to get updated plans
      const res = await providerService.getMySkills();
      const sk = res.data.data.skills || [];
      setSkills(sk);
      const updated = sk.find(s => s._id === selectedSkill._id);
      setSelectedSkill(updated);
      setPlans(updated?.plans || []);
      setModal(false);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this plan?")) return;
    try {
      await providerService.deletePlan(id);
      setPlans(prev => prev.filter(p => p._id !== id));
    } catch {
      alert("Failed to delete. Please try again.");
    }
  };

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  if (loading) return <div className="flex justify-center py-20"><Loader size={28} className="animate-spin text-primary" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-gray-900">Pricing Plans</h1><p className="text-gray-500 mt-1">Set your service packages to attract clients</p></div>
        {selectedSkill && <button onClick={openAdd} className="btn-primary flex items-center gap-2"><Plus size={16} /> Add Plan</button>}
      </div>

      {skills.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p>Please add a skill first, then you can set pricing plans.</p>
        </div>
      ) : (
        <>
          {/* Skill selector */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Select a skill</label>
            <select value={selectedSkill?._id || ""} onChange={e => handleSkillChange(e.target.value)} className="input w-auto min-w-[240px]">
              {skills.map(s => <option key={s._id} value={s._id}>{s.title}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div key={plan._id} className={`card relative border-2 hover:shadow-xl transition-all group ${plan.name === "Standard" ? "border-primary" : "border-gray-100"}`}>
                {plan.name === "Standard" && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow">Most Popular</div>}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className={`badge mb-2 ${plan.name === "Basic" ? "bg-gray-100 text-gray-600" : plan.name === "Standard" ? "bg-primary-50 text-primary" : "bg-purple-50 text-purple-600"}`}>{plan.name}</span>
                    <p className="text-3xl font-bold text-gray-900">₹{plan.price}</p>
                    <p className="text-xs text-gray-400 mt-1">Delivery: {plan.deliveryTime} • {plan.revisions} revisions</p>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEdit(plan)} className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary-50 rounded-lg transition-all"><Edit size={14} /></button>
                    <button onClick={() => handleDelete(plan._id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={14} /></button>
                  </div>
                </div>
                <div className="space-y-2.5 mb-5">
                  {plan.features?.map(f => (
                    <div key={f} className="flex items-start gap-2 text-sm text-gray-600">
                      <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"><Check size={10} className="text-green-600" /></div>
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <button onClick={openAdd} className="card border-2 border-dashed border-gray-200 flex flex-col items-center justify-center min-h-[280px] hover:border-primary hover:bg-primary-50/30 transition-all group">
              <Plus size={22} className="text-gray-300 group-hover:text-primary mb-2 transition-colors" />
              <p className="text-sm font-medium text-gray-400 group-hover:text-primary">Add New Plan</p>
            </button>
          </div>
        </>
      )}

      <Modal isOpen={modal} onClose={() => setModal(false)} title={editing ? "Edit Plan" : "Create New Plan"} size="lg">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Plan Type</label>
              <select value={form.name} onChange={e => set("name", e.target.value)} className="input" disabled={!!editing}>
                {["Basic", "Standard", "Premium"].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Price (₹)</label>
              <input type="number" value={form.price} onChange={e => set("price", e.target.value)} placeholder="999" className="input" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Delivery Time</label>
              <input value={form.deliveryTime} onChange={e => set("deliveryTime", e.target.value)} placeholder="e.g. 7 days" className="input" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Revisions</label>
              <input value={form.revisions} onChange={e => set("revisions", e.target.value)} placeholder="e.g. 3 or Unlimited" className="input" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description</label>
            <input value={form.description} onChange={e => set("description", e.target.value)} placeholder="Short description of this plan" className="input" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Features <span className="text-gray-400 font-normal">(one feature per line)</span></label>
            <textarea value={form.features} onChange={e => set("features", e.target.value)} rows={5} placeholder={"Responsive design\nSEO optimization\n2 revisions"} className="input resize-none font-mono text-sm" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setModal(false)} className="btn-outline">Cancel</button>
            <button onClick={handleSave} disabled={saving} className="btn-primary flex items-center gap-2">
              {saving && <Loader size={14} className="animate-spin" />}
              {editing ? "Update Plan" : "Create Plan"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
