import { config } from './env.js';
import ApiError from '../utils/ApiError.js';

export const corsOptions = {
  origin(origin, callback) {
    // No Origin header = same-origin / curl / server-to-server
    if (!origin || config.clientOrigins.includes(origin)) return callback(null, true);
    callback(new ApiError(403, `Origin ${origin} is not allowed`));
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 600,
};
