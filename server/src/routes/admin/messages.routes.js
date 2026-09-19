import { Router } from 'express';
import { supabase } from '../../config/supabase.js';

const router = Router();

router.get('/', async (_req, res, next) => {
	try {
		const { data, error } = await supabase.from('messages').select('*').order('received_at', { ascending: false });
		if (error) return next(error);
		res.json(data);
	} catch (error) { next(error); }
});

router.patch('/:id/read', async (req, res, next) => {
	try {
		const { data, error } = await supabase.from('messages').update({ is_read: true }).eq('id', req.params.id).select().single();
		if (error) return next(error);
		res.json(data);
	} catch (error) { next(error); }
});

router.delete('/:id', async (req, res, next) => {
	try {
		const { error } = await supabase.from('messages').delete().eq('id', req.params.id);
		if (error) return next(error);
		res.status(204).end();
	} catch (error) { next(error); }
});

export default router;
