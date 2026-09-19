import { useEffect, useState } from 'react';
import { adminGalleryService } from '../../services/adminService';
import GalleryItemForm from './GallertItemForm';

export default function GalleryManager() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const editingItem = items.find((i) => i.id === editingId);

  useEffect(() => { adminGalleryService.list().then(setItems).catch(() => setError('Unable to load gallery.')); }, []);

  const handleAdd = async (newItem) => {
    try { const created = await adminGalleryService.create(newItem); setItems((prev) => [...prev, created]); setShowAddForm(false); setError('');
    } catch { setError('Unable to create gallery item.'); }
  };

  const handleUpdate = async (updatedItem) => {
    try { const saved = await adminGalleryService.update(editingId, updatedItem); setItems((prev) => prev.map((item) => item.id === saved.id ? saved : item)); setEditingId(null); setError('');
    } catch { setError('Unable to update gallery item.'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this image from the gallery?')) return;
    try { await adminGalleryService.remove(id); setItems((prev) => prev.filter((item) => item.id !== id)); setError('');
    } catch { setError('Unable to delete gallery item.'); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Gallery Management</h2>
        {!showAddForm && !editingId && (
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
          >
            + Add Image
          </button>
        )}
      </div>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      {showAddForm && (
        <div className="mb-6">
          <GalleryItemForm onSave={handleAdd} onCancel={() => setShowAddForm(false)} />
        </div>
      )}

      {editingItem && (
        <div className="mb-6">
          <GalleryItemForm
            key={editingId}
            initialData={editingItem}
            onSave={handleUpdate}
            onCancel={() => setEditingId(null)}
          />
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <img
              src={item.image}
              alt={item.caption}
              className="w-full h-32 object-cover"
            />
            <div className="p-3">
              <p className="text-gray-700 text-xs line-clamp-2 mb-2">{item.caption}</p>
              <div className="flex gap-3">
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}