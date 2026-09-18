import { DEMO_MENU_ITEMS } from '../../utils/demoMenuData';

export default function ChefCard({ chef }) {
    const signatureItem = DEMO_MENU_ITEMS.find((item) => item.id === chef.signatureItemId);

    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden text-center p-6">
            <img
                src={chef.image}
                alt={chef.name}
                className="w-28 h-28 object-cover rounded-full mx-auto mb-4 border-4 border-orange-100"
            />
            <h3 className="font-semibold text-lg text-gray-900">{chef.name}</h3>
            <p className="text-orange-600 text-sm font-medium">{chef.title}</p>
            <p className="text-gray-500 text-sm mt-2">{chef.bio}</p>

            {signatureItem && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Signature Dish</p>
                    <p className="text-gray-800 font-medium text-sm mt-1">{signatureItem.name}</p>
                </div>
            )}
        </div>
    );
}