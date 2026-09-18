import { useState } from 'react';

const emptyDeal = { name: '', description: '', price: '', oldPrice: '', image: '', category: 'simple' };

export default function DealFormFields({ initialData, onSave, onCancel }) {
    const [form, setForm] = useState(initialData || emptyDeal);

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const discount =
        form.price && form.oldPrice
            ? Math.round(((form.oldPrice - form.price) / form.oldPrice) * 100)
            : null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...form,
            price: parseFloat(form.price),
            oldPrice: parseFloat(form.oldPrice),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-4">
            <h3 className="font-semibold text-gray-900">
                {initialData ? 'Edit Deal' : 'Create New Deal'}
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Deal Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                    <option value="simple">Simple Deal</option>
                    <option value="family">Family / Huge Deal</option>
                </select>
                <input
                    type="number"
                    step="0.01"
                    name="oldPrice"
                    placeholder="Original Price"
                    value={form.oldPrice}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <input
                    type="number"
                    step="0.01"
                    name="price"
                    placeholder="Deal Price"
                    value={form.price}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={form.image}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 sm:col-span-2"
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                    rows={2}
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 sm:col-span-2"
                />
            </div>

            {discount !== null && !isNaN(discount) && (
                <p className="text-sm text-orange-600 font-medium">
                    Auto-calculated discount: {discount}% off
                </p>
            )}

            <div className="flex gap-3">
                <button
                    type="submit"
                    className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors"
                >
                    {initialData ? 'Save Changes' : 'Create Deal'}
                </button>
                {initialData && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold px-5 py-2 rounded-full transition-colors"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}