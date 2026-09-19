import { Router } from 'express';
import { supabase } from '../../config/supabase.js';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const { data, error } = await supabase.from('chefs').select('*').order('id');
    if (error) return next(error);
    res.json(data);
  } catch (error) { next(error); }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, title, image = '', bio = '', signature_item_id = null, signatureItemId = null } = req.body;
    const { data, error } = await supabase.from('chefs').insert({ name, title, image, bio, signature_item_id: signature_item_id ?? signatureItemId }).select().single();
    if (error) return next(error);
    res.status(201).json(data);
  } catch (error) { next(error); }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const changes = { ...req.body };
    if (changes.signatureItemId !== undefined) { changes.signature_item_id = changes.signatureItemId; delete changes.signatureItemId; }
    const { data, error } = await supabase.from('chefs').update(changes).eq('id', req.params.id).select().single();
    if (error) return next(error);
    res.json(data);
  } catch (error) { next(error); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { error } = await supabase.from('chefs').delete().eq('id', req.params.id);
    if (error) return next(error);
    res.status(204).end();
  } catch (error) { next(error); }
});

export default router;