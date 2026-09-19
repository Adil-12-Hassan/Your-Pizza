import { Router } from 'express';
import { supabase } from '../../config/supabase.js';

const router = Router();

router.get('/', async (req, res, next) => {
	try {
		let query = supabase.from('menu_items').select('*').eq('is_available', true).order('id');
		if (req.query.type && req.query.type !== 'All') query = query.eq('type', req.query.type);
		const { data, error } = await query;
		if (error) return next(error);
		res.json(data);
	} catch (error) {
		next(error);
	}
});

export default router;
