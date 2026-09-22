import { z } from 'zod';
import { emailSchema, phoneSchema } from './common.validator.js';

export const bookingSchema = z.object({
	name: z.string().trim().min(1, 'Name is required.'),
	phone: phoneSchema,
	email: emailSchema,
	date: z.string().min(1, 'Date is required.'),
	time: z.string().min(1, 'Time is required.'),
	guests: z.coerce.number().int().positive('Guests must be greater than zero.'),
	notes: z.string().optional().default(''),
});
