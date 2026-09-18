import { useState } from 'react';
import { DEMO_GALLERY_ITEMS } from '../../utils/demoGalleryData';
import GalleryItemForm from './GallertItemForm';

export default function GalleryManager() {
  const [items, setItems] = useState(DEMO_GALLERY_ITEMS);
  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const editingItem = items.find((i) => i.id === editingId);

  const handleAdd = (newItem) => {
    // TODO: replace with real galleryService.createImage(newItem)
    setItems((prev) => [...prev, { ...newItem, id: Date.now() }]);
    setShowAddForm(false);
  };

  const handleUpdate = (updatedItem) => {
    // TODO: replace with real galleryService.updateImage(editingId, updatedItem)
    setItems((prev) =>
      prev.map((i) => (i.id === editingId ? { ...updatedItem, id: editingId } : i))
    );
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (!confirm('Delete this image from the gallery?')) return;
    // TODO: replace with real galleryService.deleteImage(id)
    setItems((prev) => prev.filter((i) => i.id !== id));
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