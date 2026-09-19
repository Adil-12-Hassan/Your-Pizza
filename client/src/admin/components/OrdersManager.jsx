import { useEffect, useState } from 'react';
import { ORDER_STATUSES } from '../../utils/demoOrdersData';
import { adminOrderService } from '../../services/adminService';
import OrderStatusBadge from './OrderStatusBadge';

const FILTERS = ['all', ...ORDER_STATUSES];

export default function OrdersManager() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [expandedId, setExpandedId] = useState(null);

  const loadOrders = () => adminOrderService.list().then(setOrders).catch(() => setError('Unable to load orders.'));
  useEffect(() => {
    loadOrders();
    const interval = window.setInterval(loadOrders, 10000);
    return () => window.clearInterval(interval);
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try { const updated = await adminOrderService.updateStatus(id, newStatus); setOrders((prev) => prev.map((order) => order.id === id ? { ...order, ...updated } : order)); setError('');
    } catch { setError('Unable to update order status.'); }
  };

  const filteredOrders =
    filter === 'all' ? orders : orders.filter((o) => o.status === filter);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Orders</h2>

        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-colors ${filter === f
                  ? 'bg-orange-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-300 hover:border-orange-400'
                }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      <div className="space-y-3">
        {filteredOrders.length === 0 && (
          <p className="text-gray-400 text-sm">No orders in this category.</p>
        )}

        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <button
              onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
              className="w-full flex items-center justify-between px-5 py-4 text-left"
            >
              <div>
                <p className="font-semibold text-gray-900">
                  #{order.id} — {order.customerName}
                </p>
                <p className="text-gray-500 text-xs mt-0.5">
                  {new Date(order.createdAt).toLocaleString()} · ${order.total.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <OrderStatusBadge status={order.status} />
                <span className="text-gray-400 text-sm">
                  {expandedId === order.id ? '▲' : '▼'}
                </span>
              </div>
            </button>

            {expandedId === order.id && (
              <div className="border-t border-gray-100 px-5 py-4 text-sm">
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-gray-400 text-xs uppercase mb-1">Contact</p>
                    <p className="text-gray-700">{order.phone}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs uppercase mb-1">Delivery Address</p>
                    <p className="text-gray-700">{order.address}</p>
                  </div>
                </div>

                <p className="text-gray-400 text-xs uppercase mb-1">Items</p>
                <ul className="mb-4 space-y-1">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="flex justify-between text-gray-700">
                      <span>{item.quantity}× {item.name}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="font-semibold text-gray-900">
                    Total: ${order.total.toFixed(2)}
                  </span>

                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 capitalize"
                  >
                    {ORDER_STATUSES.map((status) => (
                      <option key={status} value={status} className="capitalize">
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}