import { Router } from 'express';
import { supabase } from '../../config/supabase.js';

const router = Router();

router.get('/', async (_req, res, next) => {
	try {
		const [{ data: orders, error }, { data: items, error: itemsError }] = await Promise.all([
			supabase.from('orders').select('*').order('created_at', { ascending: false }),
			supabase.from('order_items').select('*'),
		]);
		if (error || itemsError) return next(error || itemsError);
		res.json(orders.map((order) => ({ ...order, items: items.filter((item) => item.order_id === order.id) })));
	} catch (error) { next(error); }
});

router.patch('/:id', async (req, res, next) => {
	try { const { data, error } = await supabase.from('orders').update({ status: req.body.status }).eq('id', req.params.id).select().single(); if (error) return next(error); res.json(data); } catch (error) { next(error); }
});

export default router;
