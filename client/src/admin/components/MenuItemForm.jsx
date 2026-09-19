import { useState } from 'react';
import { MENU_TYPES } from '../../utils/demoMenuData';

const emptyItem = { name: '', description: '', chef: '', price: '', image: '', type: 'Pizzas' };

export default function MenuItemForm({ initialData, chefs = [], onSave, onCancel }) {
    const [form, setForm] = useState(initialData || emptyItem);

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...form, price: parseFloat(form.price) });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-4">
            <h3 className="font-semibold text-gray-900">
                {initialData ? 'Edit Menu Item' : 'Add New Menu Item'}
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Item Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <select
                    name="chef"
                    value={form.chef}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                    <option value="">No chef assigned</option>
                    {chefs.map((chef) => <option key={chef.id} value={chef.name}>{chef.name}</option>)}
                </select>
                <input
                    type="number"
                    step="0.01"
                    name="price"
                    placeholder="Price"
                    value={form.price}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                    {MENU_TYPES.filter((t) => t !== 'All').map((type) => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
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

            <div className="flex gap-3">
                <button
                    type="submit"
                    className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors"
                >
                    {initialData ? 'Save Changes' : 'Add Item'}
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