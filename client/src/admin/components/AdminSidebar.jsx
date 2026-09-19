const SECTIONS = [
    { key: 'overview', label: 'Overview', icon: '🏠' },
    { key: 'revenue', label: 'Revenue', icon: '📊' },
    { key: 'menu', label: 'Menu', icon: '🍕' },
    { key: 'chefs', label: 'Chefs', icon: '👨‍🍳' },
    { key: 'deals', label: 'Deals', icon: '🏷️' },
    { key: 'gallery', label: 'Gallery', icon: '🖼️' },
    { key: 'messages', label: 'Messages', icon: '✉️' },
    { key: 'bookings', label: 'Bookings', icon: '📅' },
    { key: 'orders', label: 'Orders', icon: '🧾' },
    { key: 'coupons', label: 'Coupons', icon: '🎟️' },
];

import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export default function AdminSidebar({ activeSection, onSelect }) {
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/admin/login', { replace: true });
    };

    return (
        <aside className="w-full shrink-0 bg-gray-900 p-4 text-white md:min-h-screen md:w-64 md:p-6">
            <div className="mb-6 flex items-center justify-between md:block">
                <h1 className="text-xl font-bold">🍕 Admin Panel</h1>
                <button
                    type="button"
                    onClick={handleLogout}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                    Sign out
                </button>
            </div>
            <nav className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:block md:space-y-2">
                {SECTIONS.map((section) => (
                    <button
                        key={section.key}
                        type="button"
                        onClick={() => onSelect(section.key)}
                        className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${activeSection === section.key
                            ? 'bg-orange-600 text-white'
                            : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                            }`}
                    >
                        <span aria-hidden="true">{section.icon}</span>
                        {section.label}
                    </button>
                ))}
            </nav>
        </aside>
    );
}