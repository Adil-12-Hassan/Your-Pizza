import { Router } from 'express';
import { supabase } from '../../config/supabase.js';

const router = Router();

router.get('/', async (_req, res, next) => {
	try {
		const startOfDay = new Date();
		startOfDay.setHours(0, 0, 0, 0);
		const [{ data: orders, error: ordersError }, { count: messages, error: messagesError }, { count: bookings, error: bookingsError }] = await Promise.all([
			supabase.from('orders').select('total,status,created_at').gte('created_at', startOfDay.toISOString()),
			supabase.from('messages').select('id', { head: true, count: 'exact' }).eq('is_read', false),
			supabase.from('bookings').select('id', { head: true, count: 'exact' }).gte('date', startOfDay.toISOString().slice(0, 10)).in('status', ['pending', 'confirmed']),
		]);
		const error = ordersError || messagesError || bookingsError;
		if (error) return next(error);
		const activeOrders = orders.filter((order) => order.status !== 'cancelled');
		res.json({
			todayRevenue: activeOrders.reduce((sum, order) => sum + Number(order.total), 0),
			pendingOrders: activeOrders.filter((order) => ['new', 'preparing'].includes(order.status)).length,
			newMessages: messages || 0,
			upcomingBookings: bookings || 0,
		});
	} catch (error) {
		next(error);
	}
});

export default router;
