import { useState } from 'react';
import { reserveService } from '../../services/contentService';

const initialForm = {
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    guests: '1',
    notes: '',
};

export default function ReserveForm() {
    const [form, setForm] = useState(initialForm);
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            await reserveService.create(form);
            setSubmitted(true);
            setForm(initialForm);
        } catch (error) {
            window.alert(error.response?.data?.message || 'Unable to create reservation. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="text-center py-10">
                <p className="text-4xl mb-2">🎉</p>
                <p className="text-lg font-semibold text-gray-900">Reservation Requested!</p>
                <p className="text-gray-500 text-sm mt-1">
                    We'll confirm your table shortly via phone or email.
                </p>
                <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-orange-600 font-medium hover:underline"
                >
                    Make another reservation
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 sm:col-span-2"
            />
            <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <select
                name="guests"
                value={form.guests}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 sm:col-span-2"
            >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>
                        {n} Guest{n > 1 ? 's' : ''}
                    </option>
                ))}
            </select>
            <textarea
                name="notes"
                placeholder="Special requests (optional)"
                value={form.notes}
                onChange={handleChange}
                rows={3}
                className="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 sm:col-span-2"
            />

            <button
                type="submit"
                disabled={submitting}
                className="sm:col-span-2 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 text-white font-semibold py-3 rounded-full transition-colors"
            >
                {submitting ? 'Booking...' : 'Reserve a Table'}
            </button>
        </form>
    );
}