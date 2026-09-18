import { useState } from 'react';
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
import { REVENUE_BREAKDOWN, MONTHLY_REVENUE, TOTAL_REVENUE } from '../../utils/demiRevenueData';

ChartJS.register(ArcElement, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const DOUGHNUT_COLORS = ['#ea580c', '#f97316', '#fb923c', '#fdba74'];

export default function RevenueChart() {
    const [total, setTotal] = useState(TOTAL_REVENUE);
    const [breakdown, setBreakdown] = useState(REVENUE_BREAKDOWN);
    const [monthly, setMonthly] = useState(MONTHLY_REVENUE);

    const handleClearRevenue = () => {
        if (!confirm('Clear all revenue data? This cannot be undone.')) return;
        // TODO: replace with real revenueService.clearRevenue()
        setTotal(0);
        setBreakdown(breakdown.map((b) => ({ ...b, value: 0 })));
        setMonthly({ ...monthly, values: monthly.values.map(() => 0) });
    };

    const doughnutData = {
        labels: breakdown.map((b) => b.label),
        datasets: [
            {
                data: breakdown.map((b) => b.value),
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
                <button
                    onClick={handleClearRevenue}
                    className="bg-red-50 hover:bg-red-100 text-red-600 text-sm font-semibold px-4 py-2 rounded-full transition-colors"
                >
                    Clear Revenue
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <p className="text-gray-500 text-sm">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900">${total.toFixed(2)}</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Revenue by Category</h3>
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