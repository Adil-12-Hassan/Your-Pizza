import { Router } from 'express';
import { supabase } from '../../config/supabase.js';

const router = Router();

router.get('/', async (_req, res, next) => {
	try {
		const { data: orders, error } = await supabase.from('orders').select('id,total,status,created_at').neq('status', 'cancelled').order('created_at');
		if (error) return next(error);
		const total = orders.reduce((sum, order) => sum + Number(order.total), 0);
		const monthly = orders.reduce((result, order) => { const key = order.created_at.slice(0, 7); result[key] = (result[key] || 0) + Number(order.total); return result; }, {});
		res.json({ total, orders: orders.length, monthly });
	} catch (error) { next(error); }
});

router.get('/export', async (_req, res, next) => {
	try {
		const { data: orders, error } = await supabase.from('orders').select('id,customer_name,total,status,created_at').neq('status', 'cancelled').order('created_at');
		if (error) return next(error);
		const csv = ['id,customer_name,total,status,created_at', ...orders.map((row) => [row.id, JSON.stringify(row.customer_name), row.total, row.status, row.created_at].join(','))].join('\n');
		res.setHeader('Content-Type', 'text/csv');
		res.setHeader('Content-Disposition', 'attachment; filename="revenue.csv"');
		res.send(csv);
	} catch (error) { next(error); }
});

router.delete('/', async (_req, res, next) => {
	try {
		const { error } = await supabase.from('orders').delete().neq('status', 'cancelled');
		if (error) return next(error);
		res.json({ cleared: true });
	} catch (error) { next(error); }
});

export default router;
