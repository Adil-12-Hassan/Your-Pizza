import { useCartStore } from '../../store/cartStore';

export default function MenuItemCard({ item }) {
    const addItem = useCartStore((state) => state.addItem);

    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
            <img
                src={item.image}
                alt={item.name}
                className="w-full h-44 object-cover"
                loading="lazy"
            />
            <div className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-lg text-gray-900">{item.name}</h3>
                <p className="text-gray-500 text-sm mt-1 flex-1">{item.description}</p>
                <div className="flex items-center justify-between mt-4">
                    <span className="text-orange-600 font-bold">${item.price.toFixed(2)}</span>
                    <button
                        onClick={() => addItem(item)}
                        className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}