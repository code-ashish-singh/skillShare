import { useState } from "react";
import { Plus, Edit, Trash2, Check, DollarSign } from "lucide-react";
import Modal from "../../components/common/Modal";

const initialPlans = [
  { id: 1, type: "Basic", price: 49, delivery: "3 days", revisions: 2, features: ["1 landing page", "Responsive design", "Contact form"], popular: false },
  { id: 2, type: "Standard", price: 149, delivery: "7 days", revisions: 5, features: ["Up to 5 pages", "CMS integration", "SEO setup", "Analytics"], popular: true },
  { id: 3, type: "Premium", price: 349, delivery: "14 days", revisions: "Unlimited", features: ["Full web app", "API integration", "Admin panel", "Deployment", "30-day support"], popular: false },
];

export default function ProviderPlans() {
  const [plans, setPlans] = useState(initialPlans);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ type: "Basic", price: "", delivery: "", revisions: "", features: "" });

  const openAdd = () => { setEditing(null); setForm({ type: "Basic", price: "", delivery: "", revisions: "", features: "" }); setModal(true); };
  const openEdit = (p) => { setEditing(p.id); setForm({ type: p.type, price: p.price, delivery: p.delivery, revisions: p.revisions, features: p.features.join("\n") }); setModal(true); };
  const handleDelete = (id) => setPlans(prev => prev.filter(p => p.id !== id));

  const handleSave = () => {
    if (!form.price) return;
    const plan = { ...form, price: Number(form.price), features: form.features.split("\n").filter(f => f.trim()), popular: false };
    if (editing) setPlans(prev => prev.map(p => p.id === editing ? { ...p, ...plan } : p));
    else setPlans(prev => [...prev, { id: Date.now(), ...plan }]);
    setModal(false);
  };

  const typeColors = { Basic: "border-gray-200", Standard: "border-primary shadow-lg", Premium: "border-gray-200" };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-gray-900">Pricing Plans</h1><p className="text-gray-500 mt-1">Set your service packages to attract clients</p></div>
        <button onClick={openAdd} className="btn-primary flex items-center gap-2"><Plus size={16} /> Add Plan</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className={`card relative border-2 hover:shadow-xl transition-all group ${plan.popular ? "border-primary" : "border-gray-100"}`}>
            {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow">Most Popular</div>}
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className={`badge mb-2 ${plan.type === "Basic" ? "bg-gray-100 text-gray-600" : plan.type === "Standard" ? "bg-primary-50 text-primary" : "bg-purple-50 text-purple-600"}`}>{plan.type}</span>
                <p className="text-3xl font-bold text-gray-900">${plan.price}</p>
                <p className="text-xs text-gray-400 mt-1">Delivery: {plan.delivery} • {plan.revisions} revisions</p>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(plan)} className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary-50 rounded-lg transition-all"><Edit size={14} /></button>
                <button onClick={() => handleDelete(plan.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={14} /></button>
              </div>
            </div>
            <div className="space-y-2.5 mb-5">
              {plan.features.map(f => (
                <div key={f} className="flex items-start gap-2 text-sm text-gray-600">
                  <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"><Check size={10} className="text-green-600" /></div>
                  {f}
                </div>
              ))}
            </div>
            <button className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${plan.popular ? "btn-primary" : "btn-outline"}`}>
              {plan.popular ? "Most Chosen" : "Select Plan"}
            </button>
          </div>
        ))}

        <button onClick={openAdd} className="card border-2 border-dashed border-gray-200 flex flex-col items-center justify-center min-h-[280px] hover:border-primary hover:bg-primary-50/30 transition-all group">
          <div className="w-12 h-12 bg-gray-100 group-hover:bg-primary-100 rounded-2xl flex items-center justify-center mb-3 transition-colors">
            <Plus size={22} className="text-gray-400 group-hover:text-primary transition-colors" />
          </div>
          <p className="text-sm font-semibold text-gray-400 group-hover:text-primary">Add New Plan</p>
        </button>
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} title={editing ? "Edit Plan" : "Create New Plan"} size="lg">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Plan Type</label>
              <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))} className="input">
                {["Basic", "Standard", "Premium", "Custom"].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Price ($)</label>
              <div className="relative"><DollarSign size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="number" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} placeholder="99" className="input pl-8" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Delivery Time</label>
              <input value={form.delivery} onChange={e => setForm(p => ({ ...p, delivery: e.target.value }))} placeholder="e.g. 7 days" className="input" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Revisions</label>
              <input value={form.revisions} onChange={e => setForm(p => ({ ...p, revisions: e.target.value }))} placeholder="e.g. 3 or Unlimited" className="input" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Features <span className="text-gray-400 font-normal">(one per line)</span></label>
            <textarea value={form.features} onChange={e => setForm(p => ({ ...p, features: e.target.value }))} rows={5} placeholder={"Responsive design\nSEO optimization\n2 rounds of revisions"} className="input resize-none font-mono text-sm" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setModal(false)} className="btn-outline">Cancel</button>
            <button onClick={handleSave} className="btn-primary">{editing ? "Update Plan" : "Create Plan"}</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
