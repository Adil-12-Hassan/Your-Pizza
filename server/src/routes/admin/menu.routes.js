import { Router } from 'express';
import { supabase } from '../../config/supabase.js';

const router = Router();

router.get('/', async (_req, res, next) => {
	try {
		const { data, error } = await supabase.from('menu_items').select('*').order('id');
		if (error) return next(error);
		res.json(data);
	} catch (error) { next(error); }
});

router.post('/', async (req, res, next) => {
	try {
		const { name, description = '', type, price, image = '', chef = null, is_available = true } = req.body;
		const { data, error } = await supabase.from('menu_items')
			.insert({ name, description, type, price: Number(price), image, chef, is_available })
			.select().single();
		if (error) return next(error);
		res.status(201).json(data);
	} catch (error) { next(error); }
});

router.patch('/:id', async (req, res, next) => {
	try {
		const allowed = ['name', 'description', 'type', 'price', 'image', 'chef', 'is_available'];
		const changes = Object.fromEntries(Object.entries(req.body).filter(([key]) => allowed.includes(key)));
		if (changes.price !== undefined) changes.price = Number(changes.price);
		const { data, error } = await supabase.from('menu_items').update(changes).eq('id', req.params.id).select().single();
		if (error) return next(error);
		res.json(data);
	} catch (error) { next(error); }
});

router.delete('/:id', async (req, res, next) => {
	try {
		const { error } = await supabase.from('menu_items').delete().eq('id', req.params.id);
		if (error) return next(error);
		res.status(204).end();
	} catch (error) { next(error); }
});

export default router;
