const STATUS_STYLES = {
    new: 'bg-blue-50 text-blue-600',
    preparing: 'bg-yellow-50 text-yellow-700',
    delivered: 'bg-green-50 text-green-600',
    cancelled: 'bg-red-50 text-red-600',
};

export default function OrderStatusBadge({ status }) {
    return (
        <span className={`text-xs font-bold px-2 py-1 rounded-full capitalize ${STATUS_STYLES[status]}`}>
            {status}
        </span>
    );
}