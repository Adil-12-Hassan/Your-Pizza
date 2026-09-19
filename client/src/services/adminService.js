import api from './api';

const mapMenu = (item) => ({ ...item, price: Number(item.price) });
const mapDeal = (deal) => ({ ...deal, price: Number(deal.price), oldPrice: Number(deal.old_price) });
const mapCoupon = (coupon) => ({ ...coupon, discountPercent: coupon.discount_percent, expiryDate: coupon.expiry_date, maxUses: coupon.max_uses, usedCount: coupon.used_count });
const mapOrder = (order) => ({
  ...order,
  customerName: order.customer_name,
  createdAt: order.created_at,
  total: Number(order.total),
  items: (order.items || []).map((item) => ({ ...item, name: item.item_name, price: Number(item.unit_price) })),
});

const resource = (path, map = (value) => value) => ({
  list: () => api.get(path).then(({ data }) => data.map(map)),
  create: (value) => api.post(path, value).then(({ data }) => map(data)),
  update: (id, value) => api.patch(`${path}/${id}`, value).then(({ data }) => map(data)),
  remove: (id) => api.delete(`${path}/${id}`),
});

export const adminMenuService = resource('/admin/menu', mapMenu);
export const adminDealService = resource('/admin/deals', mapDeal);
export const adminGalleryService = resource('/admin/gallery');
export const adminChefService = resource('/admin/chefs');

export const adminOrderService = {
  list: () => api.get('/admin/orders').then(({ data }) => data.map(mapOrder)),
  updateStatus: (id, status) => api.patch(`/admin/orders/${id}`, { status }).then(({ data }) => mapOrder(data)),
};

export const adminRevenueService = {
  get: () => api.get('/admin/revenue').then(({ data }) => data),
  clear: () => api.delete('/admin/revenue').then(({ data }) => data),
  exportCsv: () => api.get('/admin/revenue/export', { responseType: 'blob' }).then(({ data }) => {
    const url = URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'revenue.csv';
    link.click();
    URL.revokeObjectURL(url);
  }),
};

export const adminCouponService = {
  list: () => api.get('/admin/coupons').then(({ data }) => data.map(mapCoupon)),
  create: (value) => api.post('/admin/coupons', value).then(({ data }) => mapCoupon(data)),
  update: (id, value) => api.patch(`/admin/coupons/${id}`, value).then(({ data }) => mapCoupon(data)),
  remove: (id) => api.delete(`/admin/coupons/${id}`),
};

export const adminBookingService = {
  list: () => api.get('/admin/bookings').then(({ data }) => data),
  updateStatus: (id, status) => api.patch(`/admin/bookings/${id}`, { status }).then(({ data }) => data),
};

export const adminMessageService = {
  list: () => api.get('/admin/messages').then(({ data }) => data.map((message) => ({ ...message, read: message.is_read, receivedAt: message.received_at }))),
  markRead: (id) => api.patch(`/admin/messages/${id}/read`).then(({ data }) => data),
  remove: (id) => api.delete(`/admin/messages/${id}`),
};
