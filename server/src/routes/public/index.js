import { Router } from 'express';
import { strictLimiter } from '../../middleware/rateLimiter.js';
import health from './health.routes.js';
import menu from './menu.routes.js';
import deals from './deals.routes.js';
import chefs from './chefs.routes.js';
import gallery from './gallery.routes.js';
import reviews from './reviews.routes.js';
import orders from './orders.routes.js';
import reserve from './reserve.routes.js';
import contact from './contact.routes.js';
import coupons from './coupons.routes.js';

const router = Router();

router.use('/health', health);
router.use('/menu', menu);
router.use('/deals', deals);
router.use('/chefs', chefs);
router.use('/gallery', gallery);
router.use('/reviews', reviews);
// Public write endpoints get the strict limiter
router.use('/orders', strictLimiter, orders);
router.use('/reserve', strictLimiter, reserve);
router.use('/contact', strictLimiter, contact);
router.use('/coupons', strictLimiter, coupons);

export default router;
