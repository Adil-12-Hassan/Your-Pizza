import { useState } from 'react';
import { DEMO_MENU_ITEMS } from '../../utils/demoMenuData';
import MenuItemForm from './MenuItemForm';

export default function MenuManager() {
  const [items, setItems] = useState(DEMO_MENU_ITEMS);
  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const editingItem = items.find((i) => i.id === editingId);

  const handleAdd = (newItem) => {
    // TODO: replace with real menuService.createItem(newItem)
    setItems((prev) => [...prev, { ...newItem, id: Date.now() }]);
    setShowAddForm(false);
  };

  const handleUpdate = (updatedItem) => {
    // TODO: replace with real menuService.updateItem(updatedItem.id, updatedItem)
    setItems((prev) =>
      prev.map((i) => (i.id === editingId ? { ...updatedItem, id: editingId } : i))
    );
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (!confirm('Delete this menu item?')) return;
    // TODO: replace with real menuService.deleteItem(id)
    setItems((prev) => prev.filter((i) => i.id !== id));
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

      {showAddForm && (
        <div className="mb-6">
          <MenuItemForm onSave={handleAdd} onCancel={() => setShowAddForm(false)} />
        </div>
      )}

      {editingItem && (
        <div className="mb-6">
          <MenuItemForm
            key={editingId}
            initialData={editingItem}
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