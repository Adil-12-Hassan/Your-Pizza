import { Router } from 'express';
import { supabase } from '../../config/supabase.js';
import asyncHandler from '../../utils/asyncHandler.js';

const router = Router();

// Liveness: is the process up?
router.get('/', (_req, res) => res.json({ ok: true }));

// Readiness: can we reach the database?
router.get('/db', asyncHandler(async (_req, res) => {
  const { error } = await supabase.from('menu_items').select('id', { head: true, count: 'exact' });
  if (error) return res.status(503).json({ ok: false, db: 'unreachable', message: error.message });
  res.json({ ok: true, db: 'connected' });
}));

export default router;
