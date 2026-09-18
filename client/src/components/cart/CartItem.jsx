import { useCartStore } from '../../store/cartStore';

export default function CartItem({ item }) {
    const increaseQty = useCartStore((state) => state.increaseQty);
    const decreaseQty = useCartStore((state) => state.decreaseQty);
    const removeItem = useCartStore((state) => state.removeItem);

    return (
        <div className="flex items-center gap-3 py-3 border-b border-gray-100">
            <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex-1">
                <p className="font-medium text-gray-900">{item.name}</p>
                <p className="text-orange-600 text-sm font-semibold">
                    ${item.price.toFixed(2)}
                </p>
                <div className="flex items-center gap-2 mt-1">
                    <button
                        onClick={() => decreaseQty(item.id)}
                        className="w-6 h-6 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
                    >
                        −
                    </button>
                    <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                    <button
                        onClick={() => increaseQty(item.id)}
                        className="w-6 h-6 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
                    >
                        +
                    </button>
                </div>
            </div>
            <button
                onClick={() => removeItem(item.id)}
                aria-label={`Remove ${item.name}`}
                className="text-gray-400 hover:text-red-500 text-sm"
            >
                ✕
            </button>
        </div>
    );
}