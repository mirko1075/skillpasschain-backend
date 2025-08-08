import { Request, Response, NextFunction } from 'express';
import { ApiError } from 'errors/ApiError';

export const errorHandler = (
  err: Error | ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const statusCode = err instanceof ApiError ? err.statusCode : 500;
  const message = err.message || 'Something went wrong';

  console.error(`[Error]: ${message}`);

  res.status(statusCode).json({
    success: false,
    message,
  });
};
