import { Router } from 'express';
import { supabase } from '../../config/supabase.js';

const router = Router();

router.post('/', async (req, res, next) => {
	try {
		const { name, email, message } = req.body;
		if (!name || !email || !message) return res.status(400).json({ message: 'Name, email, and message are required.' });
		const { data, error } = await supabase.from('messages').insert({ name, email, message }).select().single();
		if (error) return next(error);
		res.status(201).json(data);
	} catch (error) {
		next(error);
	}
});

export default router;
