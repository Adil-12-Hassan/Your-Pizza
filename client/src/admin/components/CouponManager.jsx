import { useState } from 'react';
import { DEMO_COUPONS } from '../../utils/demoCouponsData';
import CouponForm from './CouponForm';

export default function CouponManager() {
  const [coupons, setCoupons] = useState(DEMO_COUPONS);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAdd = (newCoupon) => {
    // TODO: replace with real couponService.createCoupon(newCoupon)
    setCoupons((prev) => [...prev, { ...newCoupon, id: Date.now() }]);
    setShowAddForm(false);
  };

  const handleDelete = (id) => {
    if (!confirm('Delete this coupon?')) return;
    // TODO: replace with real couponService.deleteCoupon(id)
    setCoupons((prev) => prev.filter((c) => c.id !== id));
  };

  const isExpiredOrUsedUp = (coupon) =>
    new Date(coupon.expiryDate) < new Date() || coupon.usedCount >= coupon.maxUses;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Coupons</h2>
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
          >
            + Create Coupon
          </button>
        )}
      </div>

      {showAddForm && (
        <div className="mb-6">
          <CouponForm onSave={handleAdd} onCancel={() => setShowAddForm(false)} />
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