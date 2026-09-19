import { Router } from 'express';
import { supabase } from '../../config/supabase.js';

const router = Router();

router.get('/', async (_req, res, next) => {
	try {
		const { data, error } = await supabase.from('bookings').select('*').order('date').order('time');
		if (error) return next(error);
		res.json(data);
	} catch (error) { next(error); }
});

router.patch('/:id', async (req, res, next) => {
	try {
		const { data, error } = await supabase.from('bookings').update({ status: req.body.status }).eq('id', req.params.id).select().single();
		if (error) return next(error);
		res.json(data);
	} catch (error) { next(error); }
});

export default router;
