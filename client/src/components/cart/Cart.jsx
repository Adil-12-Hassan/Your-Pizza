import { useState } from 'react';
import { useCartStore } from '../../store/cartStore';
import CartItem from './CartItem';
import CheckoutForm from './CheckoutForm';

export default function Cart() {
    const isOpen = useCartStore((state) => state.isOpen);
    const closeCart = useCartStore((state) => state.closeCart);
    const items = useCartStore((state) => state.items);
    const getSubtotal = useCartStore((state) => state.getSubtotal);
    const getDiscount = useCartStore((state) => state.getDiscount);

    const [orderPlaced, setOrderPlaced] = useState(false);

    const handleClose = () => {
        closeCart();
        setOrderPlaced(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40"
                onClick={handleClose}
            />

            {/* Panel */}
            <div className="relative bg-white w-full max-w-md h-full shadow-xl flex flex-col p-5 overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
                    <button
                        onClick={handleClose}
                        aria-label="Close cart"
                        className="text-gray-500 hover:text-gray-800 text-xl"
                    >
                        ✕
                    </button>
                </div>

                {orderPlaced ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center gap-2">
                        <p className="text-4xl">🎉</p>
                        <p className="text-lg font-semibold text-gray-900">Order Placed!</p>
                        <p className="text-gray-500 text-sm">We'll start preparing it right away.</p>
                        <button
                            onClick={handleClose}
                            className="mt-4 bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-full font-semibold"
                        >
                            Close
                        </button>
                    </div>
                ) : items.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-400">
                        <p className="text-4xl mb-2">🛒</p>
                        <p>Your cart is empty.</p>
                    </div>
                ) : (
                    <>
                        <div className="flex-1">
                            {items.map((item) => (
                                <CartItem key={item.id} item={item} />
                            ))}
                        </div>

                        <div className="border-t border-gray-200 pt-4 mt-4">
                            <div className="flex justify-between text-gray-700 font-medium mb-2">
                                <span>Subtotal</span>
                                <span>${getSubtotal().toFixed(2)}</span>
                            </div>
                            {getDiscount() > 0 && (
                                <div className="flex justify-between text-sm text-green-600 mb-2">
                                    <span>Coupon discount</span>
                                    <span>-${getDiscount().toFixed(2)}</span>
                                </div>
                            )}
                            <CheckoutForm onSubmitted={() => setOrderPlaced(true)} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}