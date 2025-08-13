import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../errors/ApiError';

export const notFound = (_req: Request, _res: Response, next: NextFunction) => {
  next(new ApiError(404, 'Route not found: ' + _req.originalUrl));
};
