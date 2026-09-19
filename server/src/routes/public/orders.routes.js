import { Router } from 'express';
import { supabase } from '../../config/supabase.js';

const router = Router();

router.post('/', async (req, res, next) => {
	try {
		const { name, phone, address, notes = '', items = [], couponCode = null } = req.body;
		if (!name || !phone || !address || !items.length) return res.status(400).json({ message: 'Customer details and cart items are required.' });

		const menuIds = items.filter((item) => item.itemType !== 'deal').map((item) => item.id);
		const dealIds = items.filter((item) => item.itemType === 'deal').map((item) => item.id);
		const [{ data: menuItems, error: menuError }, { data: deals, error: dealError }] = await Promise.all([
			supabase.from('menu_items').select('id, name, price').in('id', menuIds.length ? menuIds : [0]),
			supabase.from('deals').select('id, name, price').in('id', dealIds.length ? dealIds : [0]),
		]);
		if (menuError || dealError) return next(menuError || dealError);

		const products = new Map([...menuItems, ...deals].map((product) => [String(product.id), product]));
		const orderItems = items.map((item) => {
			const product = products.get(String(item.id));
			if (!product || !Number.isInteger(item.quantity) || item.quantity < 1) throw new Error('Invalid cart item.');
			return { item_type: item.itemType === 'deal' ? 'deal' : 'menu', item_id: product.id, item_name: product.name, unit_price: product.price, quantity: item.quantity };
		});
		const subtotal = orderItems.reduce((sum, item) => sum + Number(item.unit_price) * item.quantity, 0);
		let discount = 0;
		if (couponCode) {
			const { data: coupon } = await supabase.from('coupons').select('*').eq('code', String(couponCode).toUpperCase()).maybeSingle();
			if (coupon && new Date(`${coupon.expiry_date}T23:59:59`) >= new Date() && coupon.used_count < coupon.max_uses) discount = subtotal * coupon.discount_percent / 100;
		}
		const { data: order, error: orderError } = await supabase.from('orders').insert({ customer_name: name, phone, address, notes, coupon_code: couponCode, subtotal, discount, total: subtotal - discount }).select().single();
		if (orderError) return next(orderError);
		const { error: itemsError } = await supabase.from('order_items').insert(orderItems.map((item) => ({ ...item, order_id: order.id })));
		if (itemsError) return next(itemsError);
		res.status(201).json({ ...order, items: orderItems });
	} catch (error) {
		next(error);
	}
});

export default router;
