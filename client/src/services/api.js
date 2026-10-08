import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL?.trim();

if (import.meta.env.PROD && !apiUrl) {
    console.warn(
        'VITE_API_URL is not configured. Set it to the deployed Express API URL in Vercel.'
    );
}

const api = axios.create({
    baseURL: apiUrl || '/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 15000,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('admin_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default api;
