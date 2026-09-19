import { Router } from 'express';
import { supabase } from '../../config/supabase.js';

const router = Router();

router.post('/validate', async (req, res, next) => {
	try {
		const code = String(req.body.code || '').trim().toUpperCase();
		if (!code) return res.status(400).json({ message: 'Coupon code is required.' });
		const { data, error } = await supabase.from('coupons').select('*').eq('code', code).maybeSingle();
		if (error) return next(error);
		if (!data || new Date(`${data.expiry_date}T23:59:59`) < new Date() || data.used_count >= data.max_uses) {
			return res.status(400).json({ message: 'That coupon is invalid, expired, or unavailable.' });
		}
		res.json(data);
	} catch (error) {
		next(error);
	}
});

export default router;
