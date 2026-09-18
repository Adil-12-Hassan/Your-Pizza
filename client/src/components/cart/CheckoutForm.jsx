import { useState } from 'react';
import { useCartStore } from '../../store/cartStore';

export default function CheckoutForm({ onSubmitted }) {
    const items = useCartStore((state) => state.items);
    const getTotal = useCartStore((state) => state.getTotal);
    const clearCart = useCartStore((state) => state.clearCart);

    const [form, setForm] = useState({ name: '', phone: '', address: '', notes: '' });
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        // TODO: replace with real orderService.createOrder({ ...form, items, total: getTotal() })
        await new Promise((res) => setTimeout(res, 600));

        setSubmitting(false);
        clearCart();
        onSubmitted?.();
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
                onChange={handleChange}
                required
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