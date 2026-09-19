import { useEffect, useState } from 'react';
import { BOOKING_STATUSES } from '../../utils/demoBookingsData';
import { adminBookingService } from '../../services/adminService';

const STATUS_STYLES = {
    pending: 'bg-yellow-50 text-yellow-700',
    confirmed: 'bg-green-50 text-green-600',
    cancelled: 'bg-red-50 text-red-600',
};

export default function BookingsList() {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState('');

    const load = () => adminBookingService.list().then(setBookings).catch(() => setError('Unable to load bookings.'));
    useEffect(() => { load(); }, []);

    const handleStatusChange = (id, newStatus) => {
        adminBookingService.updateStatus(id, newStatus).then((updated) => setBookings((prev) => prev.map((booking) => booking.id === id ? updated : booking))).catch(() => setError('Unable to update booking.'));
    };

    const sorted = [...bookings].sort(
        (a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`)
    );

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Bookings</h2>
            {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

            <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-500 text-left">
                        <tr>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Date & Time</th>
                            <th className="px-4 py-3">Guests</th>
                            <th className="px-4 py-3">Contact</th>
                            <th className="px-4 py-3">Notes</th>
                            <th className="px-4 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sorted.map((booking) => (
                            <tr key={booking.id} className="border-t border-gray-100">
                                <td className="px-4 py-3 font-medium text-gray-900">{booking.name}</td>
                                <td className="px-4 py-3 text-gray-500">
                                    {new Date(`${booking.date}T${booking.time}`).toLocaleDateString()} · {booking.time}
                                </td>
                                <td className="px-4 py-3 text-gray-500">{booking.guests}</td>
                                <td className="px-4 py-3 text-gray-500">
                                    <div>{booking.phone}</div>
                                    <div className="text-xs">{booking.email}</div>
                                </td>
                                <td className="px-4 py-3 text-gray-500 max-w-[160px] truncate">
                                    {booking.notes || '—'}
                                </td>
                                <td className="px-4 py-3">
                                    <select
                                        value={booking.status}
                                        onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                                        className={`text-xs font-bold px-2 py-1 rounded-full capitalize border-0 focus:outline-none ${STATUS_STYLES[booking.status]}`}
                                    >
                                        {BOOKING_STATUSES.map((status) => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}