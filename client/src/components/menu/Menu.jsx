import { useState, useEffect } from 'react';
import { contentService } from '../../services/contentService';
import MenuFilter from './MenuFilter';
import MenuItemCard from './MenuItemCard';

export default function Menu() {
    const [activeType, setActiveType] = useState('All');
    const [items, setItems] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        contentService.getMenu(activeType).then(setItems).catch(() => setError('Menu is temporarily unavailable.'));
    }, [activeType]);

    return (
        <section id="menu" className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
                Our <span className="text-orange-600">Menu</span>
            </h2>
            <p className="text-gray-500 text-center mb-10">
                Freshly made, every single time.
            </p>

            <MenuFilter activeType={activeType} onSelect={setActiveType} />

            {error && <p className="text-center text-red-500 mb-6">{error}</p>}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {items.map((item) => (
                    <MenuItemCard key={item.id} item={item} />
                ))}
            </div>
        </section>
    );
}