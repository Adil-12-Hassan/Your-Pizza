import { z } from 'zod';
import { emailSchema } from './common.validator.js';

export const messageSchema = z.object({
	name: z.string().trim().min(1, 'Name is required.'),
	email: emailSchema,
	message: z.string().trim().min(1, 'Message is required.'),
});
