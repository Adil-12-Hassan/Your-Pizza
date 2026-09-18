import { useState } from 'react';
import { SIMPLE_DEALS, FAMILY_DEALS } from '../../utils/demoDealsData';
import DealFormFields from './DealsFormFields';

const initialDeals = [
  ...SIMPLE_DEALS.map((d) => ({ ...d, category: 'simple' })),
  ...FAMILY_DEALS.map((d) => ({ ...d, category: 'family' })),
];

export default function DealsManager() {
  const [deals, setDeals] = useState(initialDeals);
  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const editingDeal = deals.find((d) => d.id === editingId);

  const handleAdd = (newDeal) => {
    // TODO: replace with real dealService.createDeal(newDeal)
    setDeals((prev) => [...prev, { ...newDeal, id: Date.now() }]);
    setShowAddForm(false);
  };

  const handleUpdate = (updatedDeal) => {
    // TODO: replace with real dealService.updateDeal(editingId, updatedDeal)
    setDeals((prev) =>
      prev.map((d) => (d.id === editingId ? { ...updatedDeal, id: editingId } : d))
    );
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (!confirm('Delete this deal?')) return;
    // TODO: replace with real dealService.deleteDeal(id)
    setDeals((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Deals Management</h2>
        {!showAddForm && !editingId && (
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
          >
            + Create Deal
          </button>
        )}
      </div>

      {showAddForm && (
        <div className="mb-6">
          <DealFormFields onSave={handleAdd} onCancel={() => setShowAddForm(false)} />
        </div>
      )}

      {editingDeal && (
        <div className="mb-6">
          <DealFormFields
            key={editingId}
            initialData={editingDeal}
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
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Discount</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {deals.map((deal) => {
              const discount = Math.round(
                ((deal.oldPrice - deal.price) / deal.oldPrice) * 100
              );
              return (
                <tr key={deal.id} className="border-t border-gray-100">
                  <td className="px-4 py-3">
                    <img
                      src={deal.image}
                      alt={deal.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">{deal.name}</td>
                  <td className="px-4 py-3 text-gray-500 capitalize">{deal.category}</td>
                  <td className="px-4 py-3">
                    <span className="text-orange-600 font-semibold">
                      ${deal.price.toFixed(2)}
                    </span>
                    <span className="text-gray-400 text-xs line-through ml-2">
                      ${deal.oldPrice.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="bg-red-50 text-red-600 text-xs font-bold px-2 py-1 rounded-full">
                      -{discount}%
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingId(deal.id);
                          setShowAddForm(false);
                        }}
                        className="text-blue-600 hover:underline text-xs font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(deal.id)}
                        className="text-red-500 hover:underline text-xs font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}