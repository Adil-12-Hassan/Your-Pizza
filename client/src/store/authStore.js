import { create } from "zustand";
import api from '../services/api';
export const useAuthStore = create((set) => ({
    isAuthenticated: !!localStorage.getItem('admin_token'),
    admin: null,
    login: async (email, password) => {
        try {
            const { data } = await api.post('/admin/auth/login', { email, password });
            localStorage.setItem('admin_token', data.token);
            set({ isAuthenticated: true, admin: data.admin });
            return { success: true };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Unable to sign in.' };
        }
    },
    logout: () => {
        localStorage.removeItem('admin_token');
        set({ isAuthenticated: false, admin: null });
    },
    }));