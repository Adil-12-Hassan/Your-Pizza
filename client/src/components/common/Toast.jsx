import { useEffect } from 'react';
import { useCartStore } from '../../store/cartStore';

export default function Toast() {
    const message = useCartStore((state) => state.toastMessage);
    const clearToast = useCartStore((state) => state.clearToast);

    useEffect(() => {
        if (!message) return undefined;
        const timeoutId = window.setTimeout(clearToast, 2500);
        return () => window.clearTimeout(timeoutId);
    }, [message, clearToast]);

    if (!message) return null;

    return (
        <div
            role="status"
            className="fixed right-4 top-20 z-50 rounded-lg bg-gray-900 px-4 py-3 text-sm font-semibold text-white shadow-lg"
        >
            {message}
        </div>
    );
}