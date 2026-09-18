import api from './api';

export const bookingService = {
    getAll: () => api.get('/admin/bookings').then((res) => res.data),
    updateStatus: (id, status) => api.patch(`/admin/bookings/${id}`, { status }).then((res) => res.data),
    create: (bookingData) => api.post('/reserve', bookingData).then((res) => res.data),
};