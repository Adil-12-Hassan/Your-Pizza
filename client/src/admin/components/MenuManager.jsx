import { useEffect, useState } from 'react';
import { adminChefService, adminMenuService } from '../../services/adminService';
import MenuItemForm from './MenuItemForm';

export default function MenuManager() {
  const [items, setItems] = useState([]);
  const [chefs, setChefs] = useState([]);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const editingItem = items.find((i) => i.id === editingId);

  useEffect(() => {
    Promise.all([adminMenuService.list(), adminChefService.list()])
      .then(([menu, chefList]) => { setItems(menu); setChefs(chefList); })
      .catch(() => setError('Unable to load menu data.'));
  }, []);

  const handleAdd = async (newItem) => {
    try { const created = await adminMenuService.create(newItem); setItems((prev) => [...prev, created]); setError('');
    setShowAddForm(false);
    } catch { setError('Unable to create menu item.'); }
  };

  const handleUpdate = async (updatedItem) => {
    try { const saved = await adminMenuService.update(editingId, updatedItem); setItems((prev) => prev.map((item) => item.id === saved.id ? saved : item)); setEditingId(null); setError('');
    } catch { setError('Unable to update menu item.'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this menu item?')) return;
    try { await adminMenuService.remove(id); setItems((prev) => prev.filter((i) => i.id !== id)); setError('');
    } catch { setError('Unable to delete menu item.'); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Menu Management</h2>
        {!showAddForm && !editingId && (
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
          >
            + Add Item
          </button>
        )}
      </div>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      {showAddForm && (
        <div className="mb-6">
          <MenuItemForm chefs={chefs} onSave={handleAdd} onCancel={() => setShowAddForm(false)} />
        </div>
      )}

      {editingItem && (
        <div className="mb-6">
          <MenuItemForm
            key={editingId}
            initialData={editingItem}
            chefs={chefs}
            onSave={handleUpdate}
            onCancel={() => setEditingId(null)}
          />
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-left">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Chef</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t border-gray-100">
                <td className="px-4 py-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                </td>
                <td className="px-4 py-3 font-medium text-gray-900">{item.name}</td>
                <td className="px-4 py-3 text-gray-500">{item.type}</td>
                <td className="px-4 py-3 text-gray-500">{item.chef || '—'}</td>
                <td className="px-4 py-3 text-orange-600 font-semibold">
                  ${item.price.toFixed(2)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingId(item.id);
                        setShowAddForm(false);
                      }}
                      className="text-blue-600 hover:underline text-xs font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 hover:underline text-xs font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}