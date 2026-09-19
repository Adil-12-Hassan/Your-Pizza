import { useState } from 'react';

const emptyCoupon = { code: '', discountPercent: '', expiryDate: '', maxUses: '' };

export default function CouponForm({ coupon, onSave, onCancel }) {
    const [form, setForm] = useState(coupon || emptyCoupon);

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...form,
            code: form.code.toUpperCase(),
            discountPercent: parseInt(form.discountPercent, 10),
            maxUses: parseInt(form.maxUses, 10),
            usedCount: 0,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-4">
            <h3 className="font-semibold text-gray-900">{coupon ? 'Edit Coupon' : 'Create New Coupon'}</h3>

            <div className="grid sm:grid-cols-2 gap-4">
                <input
                    type="text"
                    name="code"
                    placeholder="Coupon Code (e.g. SAVE15)"
                    value={form.code}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 uppercase"
                />
                <input
                    type="number"
                    name="discountPercent"
                    placeholder="Discount %"
                    min="1"
                    max="100"
                    value={form.discountPercent}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <input
                    type="date"
                    name="expiryDate"
                    value={form.expiryDate}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <input
                    type="number"
                    name="maxUses"
                    placeholder="Max Uses"
                    min="1"
                    value={form.maxUses}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
            </div>

            <div className="flex gap-3">
                <button
                    type="submit"
                    className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors"
                >
                    {coupon ? 'Save Changes' : 'Create Coupon'}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold px-5 py-2 rounded-full transition-colors"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}