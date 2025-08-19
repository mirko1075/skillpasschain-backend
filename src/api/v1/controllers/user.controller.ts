import { Request, Response, NextFunction } from 'express';
import UserService from '@v1/services/user.service';
import cloudinary from '@config/cloudinary';
import fs from 'fs';
import path from 'path';
import User from '@v1/models/user.model';
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

  async getAvatar(req: Request, res: Response) {
    try {
      const user = await User.findById(req.params.id);
      if (!user || !user.avatarUrl) {
        return res.status(404).json({ message: 'Avatar not found' });
      }
      res.json({ avatarUrl: user.avatarUrl });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving avatar' });
    }
  }
  
  async uploadAvatar(req: Request, res: Response) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    let avatarUrl: string;

    if (process.env.NODE_ENV === 'production') {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'avatars',
      });
      avatarUrl = result.secure_url;

      // Remove local file after upload
      fs.unlinkSync(req.file.path);
    } else {
      avatarUrl = `/uploads/avatars/${req.file.filename}`;
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { avatarUrl },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Avatar uploaded successfully', avatarUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading avatar' });
  }
};
}

export default new UserController();
