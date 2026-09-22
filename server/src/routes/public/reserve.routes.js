import { Router } from 'express';
import { supabase } from '../../config/supabase.js';
import { validate } from '../../middleware/validate.js';
import { bookingSchema } from '../../validators/bookings.validator.js';

const router = Router();

router.post('/', validate(bookingSchema), async (req, res, next) => {
	try {
		const { name, phone, email, date, time, guests, notes = '' } = req.body;
		if (!name || !phone || !email || !date || !time || !guests) {
			return res.status(400).json({ message: 'Name, phone, email, date, time, and guests are required.' });
		}
		const { data, error } = await supabase
			.from('bookings')
			.insert({ name, phone, email, date, time, guests: Number(guests), notes })
			.select()
			.single();
		if (error) return next(error);
		res.status(201).json(data);
	} catch (error) {
		next(error);
	}
});

export default router;
