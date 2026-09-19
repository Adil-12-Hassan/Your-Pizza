import { Router } from 'express';
import publicRoutes from './public/index.js';
import adminRoutes from './admin/index.js';

const router = Router();

router.use('/admin', adminRoutes);
router.use('/', publicRoutes);

export default router;
