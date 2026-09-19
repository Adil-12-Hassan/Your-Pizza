import { Router } from 'express';
import { supabase } from '../../config/supabase.js';
import { comparePassword } from '../../utils/password.js';
import { signToken } from '../../utils/jwt.js';

const router = Router();

router.post('/login', async (req, res, next) => {
	try {
		const email = String(req.body.email || '').trim().toLowerCase();
		const password = String(req.body.password || '');
		const { data: admin, error } = await supabase.from('admins').select('id, email, password_hash').eq('email', email).maybeSingle();
		if (error) return next(error);
		if (!admin || !(await comparePassword(password, admin.password_hash))) {
			return res.status(401).json({ message: 'Invalid email or password.' });
		}
		const token = signToken({ sub: admin.id, email: admin.email, role: 'admin' });
		res.json({ token, admin: { id: admin.id, email: admin.email } });
	} catch (error) {
		next(error);
	}
});

export default router;
