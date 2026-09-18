import { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import DashboardOverview from '../components/DashboardOverview';
import RevenueChart from '../components/RevenueChart';
import MenuManager from '../components/MenuManager';
import DealsManager from '../components/DealsManager';
import GalleryManager from '../components/GalleryManager';
import MessagesList from '../components/MessagesList';
import BookingsList from '../components/BookingList';
import OrdersManager from '../components/OrdersManager';
import CouponManager from '../components/CouponManager';

const SECTION_COMPONENTS = {
    overview: DashboardOverview,
    revenue: RevenueChart,
    menu: MenuManager,
    deals: DealsManager,
    gallery: GalleryManager,
    messages: MessagesList,
    bookings: BookingsList,
    orders: OrdersManager,
    coupons: CouponManager,
};

export default function AdminDashboard() {
    const [activeSection, setActiveSection] = useState('overview');
    const ActiveComponent = SECTION_COMPONENTS[activeSection];

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
            <AdminSidebar activeSection={activeSection} onSelect={setActiveSection} />
            <main className="flex-1 p-4 md:p-8 overflow-x-auto">
                <ActiveComponent onNavigate={setActiveSection} />
            </main>
        </div>
    );
}