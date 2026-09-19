import api from './api';

const mapMenuItem = (item) => ({ ...item, price: Number(item.price) });
const mapDeal = (deal) => ({ ...deal, price: Number(deal.price), oldPrice: Number(deal.old_price) });
const mapChef = (chef) => ({ ...chef, signatureItemId: chef.signature_item_id });
const mapCoupon = (coupon) => ({
    ...coupon,
    discountPercent: coupon.discount_percent,
    expiryDate: coupon.expiry_date,
    maxUses: coupon.max_uses,
    usedCount: coupon.used_count,
});

export const contentService = {
    getMenu: (type) => api.get('/menu', { params: type && type !== 'All' ? { type } : {} }).then(({ data }) => data.map(mapMenuItem)),
    getDeals: () => api.get('/deals').then(({ data }) => data.map(mapDeal)),
    getChefs: () => api.get('/chefs').then(({ data }) => data.map(mapChef)),
    getGallery: () => api.get('/gallery').then(({ data }) => data),
    getReviews: () => api.get('/reviews').then(({ data }) => data),
    validateCoupon: (code) => api.post('/coupons/validate', { code }).then(({ data }) => mapCoupon(data)),
};

export const reserveService = {
    create: (booking) => api.post('/reserve', booking).then(({ data }) => data),
};

export const orderService = {
    create: (order) => api.post('/orders', order).then(({ data }) => data),
};

export const contactService = {
    send: (message) => api.post('/contact', message).then(({ data }) => data),
};