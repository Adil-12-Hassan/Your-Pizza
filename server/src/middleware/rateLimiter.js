import rateLimit from 'express-rate-limit';

const make = (limit, windowMinutes, message) =>
  rateLimit({
    windowMs: windowMinutes * 60 * 1000,
    limit,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message },
  });

export const apiLimiter = make(300, 15, 'Too many requests, please try again later.');
// Public write endpoints (orders, reserve, contact, coupon check)
export const strictLimiter = make(20, 15, 'Too many submissions, please slow down.');
export const loginLimiter = make(10, 15, 'Too many login attempts, try again later.');
