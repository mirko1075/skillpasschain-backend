import { Request, Response, NextFunction } from 'express';
import * as AuthService from '@v1/services/auth.service';
import { ApiError } from 'errors/ApiError';

class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  };

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      const result = await AuthService.refreshAccessToken(refreshToken);
      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  }
  async getCurrentUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = (req as any).user;
      if (!user) return next(new ApiError(401, 'Unauthorized'));
      res.json({ success: true, user });
    } catch (err) {
      next(err);
    }
  };

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      await AuthService.logout((req as any).user.id);
      res.json({ success: true, message: 'Logged out successfully' });
    } catch (err) {
      next(err);
    }
  };

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { firstName, lastName, email, password, role } = req.body;

    // Enforce normal users registering via public route as "user"
    let assignedRole = 'user';

    // If role is "admin" — allow only if requester is already authenticated admin
    if (role === 'admin') {
      const currentUser = (req as any).user;
      if (!currentUser || currentUser.role !== 'admin') {
        return next(new ApiError(403, 'Forbidden: Only admins can create other admins.'));
      }
      assignedRole = 'admin';
    }

    const user = await AuthService.register(
      firstName,
      lastName,
      email,
      password
    );

    res.status(201).json({ success: true, user });
  } catch (err) {
    next(err);
  }
  };
};

export default new AuthController();