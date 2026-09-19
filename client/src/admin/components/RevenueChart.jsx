import { useEffect, useState } from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js';
import { adminRevenueService } from '../../services/adminService';

ChartJS.register(ArcElement, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const DOUGHNUT_COLORS = ['#ea580c', '#f97316', '#fb923c', '#fdba74'];

export default function RevenueChart() {
    const [total, setTotal] = useState(0);
    const [monthly, setMonthly] = useState({ labels: [], values: [] });
    const [error, setError] = useState('');

    const load = () => adminRevenueService.get().then((data) => {
        setTotal(Number(data.total));
        const entries = Object.entries(data.monthly || {});
        setMonthly({ labels: entries.map(([label]) => label), values: entries.map(([, value]) => Number(value)) });
    }).catch(() => setError('Unable to load revenue.'));
    useEffect(() => { load(); }, []);

    const handleClearRevenue = async () => {
        if (!confirm('Clear all revenue data? This cannot be undone.')) return;
        try { await adminRevenueService.clear(); await load(); } catch { setError('Unable to clear revenue.'); }
    };

    const doughnutData = {
        labels: ['Revenue'],
        datasets: [
            {
                data: [total],
                backgroundColor: DOUGHNUT_COLORS,
                borderWidth: 0,
            },
        ],
    };

    const lineData = {
        labels: monthly.labels,
        datasets: [
            {
                label: 'Revenue ($)',
                data: monthly.values,
                borderColor: '#ea580c',
                backgroundColor: 'rgba(234, 88, 12, 0.1)',
                fill: true,
                tension: 0.3,
            },
        ],
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Revenue</h2>
                <div className="flex gap-2"><button onClick={() => adminRevenueService.exportCsv().catch(() => setError('Unable to export revenue.'))} className="rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold">Download CSV</button><button onClick={handleClearRevenue} className="rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-600">Clear Revenue</button></div>
            </div>

            {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <p className="text-gray-500 text-sm">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900">${total.toFixed(2)}</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Revenue Total</h3>
                    <div className="max-w-xs mx-auto">
                        <Doughnut data={doughnutData} />
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Monthly Trend</h3>
                    <Line data={lineData} />
                </div>
            </div>
        </div>
    );
}