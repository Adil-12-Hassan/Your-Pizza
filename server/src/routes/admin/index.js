import { Router } from 'express';
import { requireAdmin } from '../../middleware/authenticate.js';
import { loginLimiter } from '../../middleware/rateLimiter.js';
import auth from './auth.routes.js';
import menu from './menu.routes.js';
import deals from './deals.routes.js';
import gallery from './gallery.routes.js';
import coupons from './coupons.routes.js';
import orders from './orders.routes.js';
import bookings from './bookings.routes.js';
import messages from './messages.routes.js';
import revenue from './revenue.routes.js';
import dashboard from './dashboard.routes.js';
import chefs from './chefs.routes.js';

const router = Router();

// Login must stay reachable without a token, so it is mounted BEFORE requireAdmin.
router.use('/auth', loginLimiter, auth);

// Everything below requires a valid admin JWT.
router.use(requireAdmin);
router.use('/menu', menu);
router.use('/chefs', chefs);
router.use('/deals', deals);
router.use('/gallery', gallery);
router.use('/coupons', coupons);
router.use('/orders', orders);
router.use('/bookings', bookings);
router.use('/messages', messages);
router.use('/revenue', revenue);
router.use('/dashboard', dashboard);

export default router;
