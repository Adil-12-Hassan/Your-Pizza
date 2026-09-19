import { useEffect, useState } from 'react';
import CouponForm from './CouponForm';
import { adminCouponService } from '../../services/adminService';

export default function CouponManager() {
  const [coupons, setCoupons] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => { adminCouponService.list().then(setCoupons).catch(() => setError('Unable to load coupons.')); }, []);

  const handleAdd = async (newCoupon) => {
    try { const created = await adminCouponService.create({ code: newCoupon.code, discount_percent: newCoupon.discountPercent, expiry_date: newCoupon.expiryDate, max_uses: newCoupon.maxUses }); setCoupons((prev) => [...prev, created]); setShowAddForm(false); } catch { setError('Unable to create coupon.'); }
  };

  const handleEdit = async (updatedCoupon) => {
    try {
      const updated = await adminCouponService.update(editingCoupon.id, { code: updatedCoupon.code, discount_percent: updatedCoupon.discountPercent, expiry_date: updatedCoupon.expiryDate, max_uses: updatedCoupon.maxUses });
      setCoupons((prev) => prev.map((coupon) => coupon.id === updated.id ? updated : coupon));
      setEditingCoupon(null);
    } catch { setError('Unable to update coupon.'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this coupon?')) return;
    try { await adminCouponService.remove(id); setCoupons((prev) => prev.filter((coupon) => coupon.id !== id)); } catch { setError('Unable to delete coupon.'); }
  };

  const isExpiredOrUsedUp = (coupon) =>
    new Date(coupon.expiryDate) < new Date() || coupon.usedCount >= coupon.maxUses;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Coupons</h2>
        {!showAddForm && !editingCoupon && (
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
          >
            + Create Coupon
          </button>
        )}
      </div>
      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      {showAddForm && !editingCoupon && (
        <div className="mb-6">
          <CouponForm onSave={handleAdd} onCancel={() => setShowAddForm(false)} />
        </div>
      )}

      {editingCoupon && (
        <div className="mb-6">
          <CouponForm coupon={{ code: editingCoupon.code, discountPercent: editingCoupon.discountPercent, expiryDate: editingCoupon.expiryDate.slice(0, 10), maxUses: editingCoupon.maxUses }} onSave={handleEdit} onCancel={() => setEditingCoupon(null)} />
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-left">
            <tr>
              <th className="px-4 py-3">Code</th>
              <th className="px-4 py-3">Discount</th>
              <th className="px-4 py-3">Expiry</th>
              <th className="px-4 py-3">Usage</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => {
              const expired = isExpiredOrUsedUp(coupon);
              return (
                <tr key={coupon.id} className="border-t border-gray-100">
                  <td className="px-4 py-3 font-mono font-semibold text-gray-900">
                    {coupon.code}
                  </td>
                  <td className="px-4 py-3 text-orange-600 font-semibold">
                    {coupon.discountPercent}%
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(coupon.expiryDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {coupon.usedCount} / {coupon.maxUses}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded-full ${expired ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
                        }`}
                    >
                      {expired ? 'Expired/Used' : 'Active'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => { setEditingCoupon(coupon); setShowAddForm(false); setError(''); }}
                      className="text-blue-600 hover:underline text-xs font-medium mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(coupon.id)}
                      className="text-red-500 hover:underline text-xs font-medium"
                    >
                      Delete
                    </button>
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