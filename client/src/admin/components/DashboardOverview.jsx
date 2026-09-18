const SUMMARY_CARDS = [
    { label: 'Today\'s Revenue', value: '$0.00', icon: '💰' },
    { label: 'Pending Orders', value: '0', icon: '🧾' },
    { label: 'New Messages', value: '0', icon: '✉️' },
    { label: 'Upcoming Bookings', value: '0', icon: '📅' },
];

export default function DashboardOverview({ onNavigate }) {
    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome back, Admin 👋</h2>
            <p className="text-gray-500 mb-6">Here's what's happening today.</p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {SUMMARY_CARDS.map((card) => (
                    <div key={card.label} className="bg-white rounded-xl shadow-sm p-5">
                        <p className="text-2xl mb-1">{card.icon}</p>
                        <p className="text-xl font-bold text-gray-900">{card.value}</p>
                        <p className="text-gray-500 text-sm">{card.label}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() => onNavigate('menu')}
                        className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
                    >
                        + Add Menu Item
                    </button>
                    <button
                        onClick={() => onNavigate('deals')}
                        className="bg-orange-100 hover:bg-orange-200 text-orange-700 text-sm font-semibold px-4 py-2 rounded-full transition-colors"
                    >
                        + Create Deal
                    </button>
                    <button
                        onClick={() => onNavigate('orders')}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold px-4 py-2 rounded-full transition-colors"
                    >
                        View Orders
                    </button>
                </div>
            </div>
        </div>
    );
}