import { useState } from 'react';

const emptyItem = { image: '', caption: '' };

export default function GalleryItemForm({ initialData, onSave, onCancel }) {
    const [form, setForm] = useState(initialData || emptyItem);

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(form);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-4">
            <h3 className="font-semibold text-gray-900">
                {initialData ? 'Edit Image' : 'Add New Image'}
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={form.image}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 sm:col-span-2"
                />
                <input
                    type="text"
                    name="caption"
                    placeholder="Caption (shown on hover)"
                    value={form.caption}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 sm:col-span-2"
                />
            </div>

            {form.image && (
                <img
                    src={form.image}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                />
            )}

            <div className="flex gap-3">
                <button
                    type="submit"
                    className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors"
                >
                    {initialData ? 'Save Changes' : 'Add Image'}
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