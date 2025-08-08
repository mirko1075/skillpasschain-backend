import { Request, Response, NextFunction } from 'express';
import UserService from '@v1/services/user.service';
import AppError from '@utils/AppError';

export const getAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await UserService.getAllUsers();

    if (!users || users.length === 0) {
      throw new AppError('No users found', 404);
    }

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};
