import { Request, Response, NextFunction } from 'express';
import AppError from '@utils/AppError';

export const errorHandler = (
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err.message || 'Something went wrong';

  console.error(`[Error]: ${message}`);

  res.status(statusCode).json({
    success: false,
    message
  });
};
