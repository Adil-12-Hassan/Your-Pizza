import { Router } from 'express';
import { supabase } from '../../config/supabase.js';

const router = Router();

router.get('/', async (_req, res, next) => {
	try {
		const { data, error } = await supabase.from('gallery_items').select('*').order('id');
		if (error) return next(error);
		res.json(data);
	} catch (error) {
		next(error);
	}
});

export default router;
