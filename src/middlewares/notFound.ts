import { Request, Response, NextFunction } from 'express';
import AppError from '@utils/AppError';

export const notFound = (_req: Request, _res: Response, next: NextFunction) => {
  next(new AppError('Route not found', 404));
};
