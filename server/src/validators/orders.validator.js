import { z } from 'zod';
import { phoneSchema } from './common.validator.js';

export const orderSchema = z.object({
	name: z.string().trim().min(1, 'Name is required.'),
	phone: phoneSchema,
	address: z.string().trim().min(1, 'Address is required.'),
	notes: z.string().optional().default(''),
	items: z.array(z.object({
		id: z.union([z.number(), z.string()]),
		itemType: z.string().optional(),
		quantity: z.number().int().min(1),
	})).min(1, 'Cart cannot be empty.'),
	couponCode: z.string().trim().nullable().optional().default(null),
});
