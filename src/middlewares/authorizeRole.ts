import { ApiError } from 'errors/ApiError';
import { Request, Response, NextFunction } from 'express';
/**
 * Middleware to authorize user roles.
 * @param roles - Array of roles that are allowed to access the route.
 */
export const authorizeRole = (...roles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const userRole = (req as any).user?.role; // set by auth middleware
    if (!roles.includes(userRole)) {
      return next(new ApiError(403, 'Forbidden: You do not have access to this resource'));
    }
    next();
  };
};
