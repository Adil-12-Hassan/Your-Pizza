import { MENU_TYPES } from '../../utils/demoMenuData';

export default function MenuFilter({ activeType, onSelect }) {
    return (
        <div className="flex flex-wrap justify-center gap-3 mb-10">
            {MENU_TYPES.map((type) => (
                <button
                    key={type}
                    onClick={() => onSelect(type)}
                    className={`px-5 py-2 rounded-full font-medium border transition-colors ${activeType === type
                            ? 'bg-orange-600 text-white border-orange-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-orange-400'
                        }`}
                >
                    {type}
                </button>
            ))}
        </div>
    );
}