import { Router } from 'express';
import { supabase } from '../../config/supabase.js';

const router = Router();

router.get('/', async (_req, res, next) => {
	try { const { data, error } = await supabase.from('gallery_items').select('*').order('id'); if (error) return next(error); res.json(data); } catch (error) { next(error); }
});
router.post('/', async (req, res, next) => {
	try { const { data, error } = await supabase.from('gallery_items').insert(req.body).select().single(); if (error) return next(error); res.status(201).json(data); } catch (error) { next(error); }
});
router.patch('/:id', async (req, res, next) => {
	try { const { data, error } = await supabase.from('gallery_items').update(req.body).eq('id', req.params.id).select().single(); if (error) return next(error); res.json(data); } catch (error) { next(error); }
});
router.delete('/:id', async (req, res, next) => {
	try { const { error } = await supabase.from('gallery_items').delete().eq('id', req.params.id); if (error) return next(error); res.status(204).end(); } catch (error) { next(error); }
});

export default router;
