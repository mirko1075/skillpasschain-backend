import { Request, Response, NextFunction } from 'express';
import UserService from '@v1/services/user.service';
import { ApiError } from 'errors/ApiError';

export const getAllUsers = (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = UserService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = UserService.getUserById(id);
    if (!user) {
      throw new ApiError(404, `User with id ${id} not found`);
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      throw new ApiError(400, 'Name and email are required');
    }

    const newUser = UserService.createUser(name, email);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};
export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    if (!name || !email) {
      throw new ApiError(400, 'Name and email are required');
    }

    const user = UserService.getUserById(id);
    if (!user) {
      throw new ApiError(404, `User with id ${id} not found`);
    }

    user.name = name;
    user.email = email;

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};