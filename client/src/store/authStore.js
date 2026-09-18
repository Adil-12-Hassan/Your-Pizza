import { create } from "zustand";
export const useAuthStore = create((set) => ({
    isAuthenticated: !!localStorage.getItem('admin_token'),
    admin: null,
    login: async (email, password) => {
        await new Promise((res) => setTimeout(res, 500));
        if (email === 'admin@pizzashop.com' && password === 'Admin@PizzaShop') {
            localStorage.setItem('admin_token', 'demo_token');
            return { success: true };
        }
        return { success: false, error: 'Invalid email or password.' };
    },
    logout: () => {
        localStorage.removeItem('admin_token');
        set({ isAuthenticated: false, admin: null });
    },
    }));