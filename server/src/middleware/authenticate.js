import ApiError from '../utils/ApiError.js';
import { verifyToken } from '../utils/jwt.js';

// Guards admin routes. Expects: Authorization: Bearer <jwt>
export function requireAdmin(req, _res, next) {
  const [scheme, token] = (req.headers.authorization || '').split(' ');
  if (scheme !== 'Bearer' || !token) return next(new ApiError(401, 'Authentication required'));
  try {
    req.admin = verifyToken(token);
    next();
  } catch {
    next(new ApiError(401, 'Invalid or expired token'));
  }
}
