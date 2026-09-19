import { useEffect, useState } from 'react';
import { adminChefService, adminMenuService } from '../../services/adminService';

const emptyChef = { name: '', title: '', image: '', bio: '', signature_item_id: '' };

export default function ChefManager() {
  const [chefs, setChefs] = useState([]);
  const [menu, setMenu] = useState([]);
  const [form, setForm] = useState(emptyChef);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  const load = () => Promise.all([adminChefService.list(), adminMenuService.list()]).then(([chefList, menuList]) => { setChefs(chefList); setMenu(menuList); }).catch(() => setError('Unable to load chefs.'));
  useEffect(() => { load(); }, []);

  const change = (event) => setForm((previous) => ({ ...previous, [event.target.name]: event.target.value }));
  const submit = async (event) => {
    event.preventDefault();
    try {
      const payload = { ...form, signature_item_id: form.signature_item_id ? Number(form.signature_item_id) : null };
      if (editingId) await adminChefService.update(editingId, payload);
      else await adminChefService.create(payload);
      setForm(emptyChef); setEditingId(null); setError(''); await load();
    } catch { setError('Unable to save chef.'); }
  };
  const remove = async (id) => {
    if (!confirm('Delete this chef?')) return;
    try { await adminChefService.remove(id); setChefs((previous) => previous.filter((chef) => chef.id !== id)); } catch { setError('Unable to delete chef.'); }
  };

  return <div>
    <h2 className="mb-6 text-2xl font-bold text-gray-900">Chef Management</h2>
    {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
    <form onSubmit={submit} className="mb-6 grid gap-4 rounded-xl bg-white p-6 shadow-sm sm:grid-cols-2">
      <input name="name" value={form.name} onChange={change} placeholder="Chef name" required className="rounded-lg border px-4 py-2 text-sm" />
      <input name="title" value={form.title} onChange={change} placeholder="Title" required className="rounded-lg border px-4 py-2 text-sm" />
      <input name="image" value={form.image} onChange={change} placeholder="Image URL" className="rounded-lg border px-4 py-2 text-sm" />
      <select name="signature_item_id" value={form.signature_item_id} onChange={change} className="rounded-lg border px-4 py-2 text-sm">
        <option value="">Select signature food</option>
        {menu.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
      </select>
      <textarea name="bio" value={form.bio} onChange={change} placeholder="Bio" rows="2" className="rounded-lg border px-4 py-2 text-sm sm:col-span-2" />
      <div className="flex gap-3 sm:col-span-2"><button className="rounded-full bg-orange-600 px-5 py-2 text-sm font-semibold text-white">{editingId ? 'Save Changes' : 'Add Chef'}</button>{editingId && <button type="button" onClick={() => { setForm(emptyChef); setEditingId(null); }} className="rounded-full bg-gray-100 px-5 py-2 text-sm font-semibold">Cancel</button>}</div>
    </form>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{chefs.map((chef) => <article key={chef.id} className="rounded-xl bg-white p-4 shadow-sm"><img src={chef.image} alt={chef.name} className="mb-3 h-40 w-full rounded-lg object-cover" /><h3 className="font-semibold">{chef.name}</h3><p className="text-sm text-gray-500">{chef.title}</p><p className="mt-2 text-sm text-gray-600">Signature: {menu.find((item) => item.id === chef.signature_item_id)?.name || 'None'}</p><div className="mt-3 flex gap-3 text-xs font-medium"><button onClick={() => { setForm({ ...chef, signature_item_id: chef.signature_item_id || '' }); setEditingId(chef.id); }} className="text-blue-600">Edit</button><button onClick={() => remove(chef.id)} className="text-red-600">Delete</button></div></article>)}</div>
  </div>;
}
