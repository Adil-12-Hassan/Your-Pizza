import { config } from '../config/env.js';

// Last middleware. Error response shape: { message, details? }
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, _req, res, _next) {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Invalid JSON body' });
  }

  const status = err.status || 500;
  if (status >= 500) console.error(err);

  res.status(status).json({
    message: status >= 500 && config.isProd ? 'Internal server error' : err.message,
    ...(err.details && { details: err.details }),
  });
}
