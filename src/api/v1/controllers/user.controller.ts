import { Request, Response, NextFunction } from 'express';
import UserService from '@v1/services/user.service';

class UserController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserService.getAll();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserService.getById(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newUser = await UserService.create(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const updated = await UserService.update(req.params.id, req.body);
      if (!updated) return res.status(404).json({ message: 'User not found' });
      res.json(updated);
    } catch (error) {
      next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const deleted = await UserService.delete(req.params.id);
      if (!deleted) return res.status(404).json({ message: 'User not found' });
      res.json({ message: 'User deleted' });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
