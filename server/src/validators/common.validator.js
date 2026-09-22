import { z } from 'zod';

export const phoneSchema = z.string().regex(/^\d{11}$/, 'Phone number must be exactly 11 digits.');
export const emailSchema = z.string().email('Please provide a valid email address.');
