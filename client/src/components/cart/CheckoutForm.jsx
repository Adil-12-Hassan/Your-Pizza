import { useState } from 'react';
import { useCartStore } from '../../store/cartStore';
import { orderService } from '../../services/contentService';

export default function CheckoutForm({ onSubmitted }) {
    const items = useCartStore((state) => state.items);
    const appliedCoupon = useCartStore((state) => state.appliedCoupon);
    const couponError = useCartStore((state) => state.couponError);
    const applyCoupon = useCartStore((state) => state.applyCoupon);
    const removeCoupon = useCartStore((state) => state.removeCoupon);
    const getTotal = useCartStore((state) => state.getTotal);
    const clearCart = useCartStore((state) => state.clearCart);

    const [form, setForm] = useState({ name: '', phone: '', address: '', notes: '' });
    const [couponCode, setCouponCode] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            await orderService.create({ ...form, items, couponCode: appliedCoupon?.code || null });
            clearCart();
            setCouponCode('');
            onSubmitted?.();
        } catch (error) {
            window.alert(error.response?.data?.message || 'Unable to place your order. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3 mt-4">
            <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) => handleChange({ target: { name: 'phone', value: e.target.value.replace(/\D/g, '').slice(0, 11) } })}
                required
                inputMode="numeric"
                pattern="[0-9]{11}"
                minLength={11}
                maxLength={11}
                title="Phone number must be exactly 11 digits"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
                type="text"
                name="address"
                placeholder="Delivery Address"
                value={form.address}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <textarea
                name="notes"
                placeholder="Notes (optional)"
                value={form.notes}
                onChange={handleChange}
                rows={2}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            <div className="space-y-2">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        placeholder="Coupon code"
                        disabled={Boolean(appliedCoupon)}
                        className="min-w-0 flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm uppercase focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100"
                    />
                    {appliedCoupon ? (
                        <button
                            type="button"
                            onClick={() => {
                                removeCoupon();
                                setCouponCode('');
                            }}
                            className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                        >
                            Remove
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={() => applyCoupon(couponCode)}
                            className="rounded-lg bg-gray-900 px-3 py-2 text-sm font-semibold text-white hover:bg-gray-700"
                        >
                            Apply
                        </button>
                    )}
                </div>
                {appliedCoupon && (
                    <p className="text-sm text-green-600">
                        {appliedCoupon.code} applied: {appliedCoupon.discountPercent}% off
                    </p>
                )}
                {couponError && <p className="text-sm text-red-500">{couponError}</p>}
            </div>

            <button
                type="submit"
                disabled={items.length === 0 || submitting}
                className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 text-white font-semibold py-3 rounded-full transition-colors"
            >
                {submitting ? 'Placing Order...' : `Confirm Order · $${getTotal().toFixed(2)}`}
            </button>
        </form>
    );
}