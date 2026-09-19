import { Router } from 'express';
import { supabase } from '../../config/supabase.js';

const router = Router();

router.get('/', async (_req, res, next) => {
	try {
		const { data, error } = await supabase.from('coupons').select('*').order('id');
		if (error) return next(error);
		res.json(data);
	} catch (error) { next(error); }
});

router.post('/', async (req, res, next) => {
	try {
		const { code, discount_percent, expiry_date, max_uses } = req.body;
		const { data, error } = await supabase.from('coupons').insert({ code: String(code).toUpperCase(), discount_percent: Number(discount_percent), expiry_date, max_uses: Number(max_uses) }).select().single();
		if (error) return next(error);
		res.status(201).json(data);
	} catch (error) { next(error); }
});

router.patch('/:id', async (req, res, next) => {

	try {
		const { code, discount_percent, expiry_date, max_uses } = req.body;
		const changes = { code: String(code).toUpperCase(), discount_percent: Number(discount_percent), expiry_date, max_uses: Number(max_uses) };
		const { data, error } = await supabase.from('coupons').update(changes).eq('id', req.params.id).select().single();
		if (error) return next(error);
		res.json(data);
	} catch (error) { next(error); }
});

router.delete('/:id', async (req, res, next) => {
	try {
		const { error } = await supabase.from('coupons').delete().eq('id', req.params.id);
		if (error) return next(error);
		res.status(204).end();
	} catch (error) { next(error); }
});

export default router;
