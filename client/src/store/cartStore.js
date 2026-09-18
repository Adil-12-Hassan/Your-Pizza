import { create } from 'zustand';
import { DEMO_COUPONS } from '../utils/demoCouponsData';

export const useCartStore = create((set, get) => ({
    items: [],
    isOpen: false,
    appliedCoupon: null,
    couponError: '',
    addItem: (item) =>
        set((state) => {
            const existing = state.items.find((i) => i.id === item.id);
            if (existing) {
                return {
                    items: state.items.map((i) =>
                        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                    ),
                };
            }
            return { items: [...state.items, { ...item, quantity: 1 }] };
        }),
    increaseQty: (id) =>
        set((state) => ({
            items: state.items.map((i) =>
                i.id === id ? { ...i, quantity: i.quantity + 1 } : i
            ),
        })),
    decreaseQty: (id) =>
        set((state) => ({
            items: state.items
                .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
                .filter((i) => i.quantity > 0),
        })),
    removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
    clearCart: () => set({ items: [], appliedCoupon: null, couponError: '' }),
    toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
    closeCart: () => set({ isOpen: false }),
    applyCoupon: (code) => {
        const normalizedCode = code.trim().toUpperCase();
        const coupon = DEMO_COUPONS.find((item) => item.code === normalizedCode);

        if (!normalizedCode) {
            set({ appliedCoupon: null, couponError: 'Enter a coupon code.' });
            return false;
        }

        if (!coupon) {
            set({ appliedCoupon: null, couponError: 'That coupon code is not valid.' });
            return false;
        }

        if (new Date(coupon.expiryDate) < new Date() || coupon.usedCount >= coupon.maxUses) {
            set({ appliedCoupon: null, couponError: 'That coupon has expired or reached its usage limit.' });
            return false;
        }

        set({ appliedCoupon: coupon, couponError: '' });
        return true;
    },
    removeCoupon: () => set({ appliedCoupon: null, couponError: '' }),
    getSubtotal: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    getDiscount: () => {
        const subtotal = get().getSubtotal();
        return get().appliedCoupon
            ? subtotal * (get().appliedCoupon.discountPercent / 100)
            : 0;
    },
    getTotal: () => get().getSubtotal() - get().getDiscount(),
}));