import { create } from 'zustand';
import { contentService } from '../services/contentService';

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
    applyCoupon: async (code) => {
        const normalizedCode = code.trim().toUpperCase();

        if (!normalizedCode) {
            set({ appliedCoupon: null, couponError: 'Enter a coupon code.' });
            return false;
        }

        try {
            const coupon = await contentService.validateCoupon(normalizedCode);
            set({ appliedCoupon: coupon, couponError: '' });
            return true;
        } catch (error) {
            set({ appliedCoupon: null, couponError: error.response?.data?.message || 'That coupon code is not valid.' });
            return false;
        }
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