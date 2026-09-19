import { Router } from 'express';
import { supabase } from '../../config/supabase.js';

const router = Router();

router.get('/', async (_req, res, next) => {
	try {
		const { data, error } = await supabase.from('deals').select('*').order('id');
		if (error) return next(error);
		res.json(data);
	} catch (error) { next(error); }
});

router.post('/', async (req, res, next) => {
	try {
		const { name, description = '', price, old_price, oldPrice, image = '', category = 'simple', is_active = true } = req.body;
		const { data, error } = await supabase.from('deals').insert({ name, description, price: Number(price), old_price: Number(old_price ?? oldPrice), image, category, is_active }).select().single();
		if (error) return next(error);
		res.status(201).json(data);
	} catch (error) { next(error); }
});

router.patch('/:id', async (req, res, next) => {
	try {
		const changes = { ...req.body };
		if (changes.oldPrice !== undefined) { changes.old_price = changes.oldPrice; delete changes.oldPrice; }
		['price', 'old_price'].forEach((key) => { if (changes[key] !== undefined) changes[key] = Number(changes[key]); });
		const { data, error } = await supabase.from('deals').update(changes).eq('id', req.params.id).select().single();
		if (error) return next(error);
		res.json(data);
	} catch (error) { next(error); }
});

router.delete('/:id', async (req, res, next) => {
	try {
		const { error } = await supabase.from('deals').delete().eq('id', req.params.id);
		if (error) return next(error);
		res.status(204).end();
	} catch (error) { next(error); }
});

export default router;
