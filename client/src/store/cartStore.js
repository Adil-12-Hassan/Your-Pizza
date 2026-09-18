import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
    items: [],
    isOpen: false,
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
    clearCart: () => set({ items: [] }),
    toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
    closeCart: () => set({ isOpen: false }),
    getTotal: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
}));