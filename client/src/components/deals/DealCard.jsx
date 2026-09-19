import { useCartStore } from '../../store/cartStore';

export default function DealCard({ deal }) {
    const addItem = useCartStore((state) => state.addItem);
    const discount = Math.round(((deal.oldPrice - deal.price) / deal.oldPrice) * 100);

    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col relative">
            <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                -{discount}%
            </span>
            <img
                src={deal.image}
                alt={deal.name}
                className="w-full h-40 object-cover"
                loading="lazy"
            />
            <div className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-lg text-gray-900">{deal.name}</h3>
                <p className="text-gray-500 text-sm mt-1 flex-1">{deal.description}</p>
                <div className="flex items-center gap-2 mt-3">
                    <span className="text-orange-600 font-bold">${deal.price.toFixed(2)}</span>
                    <span className="text-gray-400 text-sm line-through">
                        ${deal.oldPrice.toFixed(2)}
                    </span>
                </div>
                <button
                    onClick={() => addItem({ ...deal, itemType: 'deal', price: deal.price })}
                    className="mt-3 bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold py-2 rounded-full transition-colors"
                >
                    Grab This Deal
                </button>
            </div>
        </div>
    );
}