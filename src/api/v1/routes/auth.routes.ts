import { Router } from 'express';
import * as AuthController from '@v1/controllers/auth.controller';
import { authenticate } from '@v1/middlewares/auth.middleware';
import { authorizeRole } from '@middlewares/authorizeRole';
import authController from '@v1/controllers/auth.controller';
const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh', authController.refreshToken);
router.post('/logout', authenticate, authController.logout);
router.post(
  '/create-admin',
  authenticate,
  authorizeRole('admin'),
  authController.register // This will pass "admin" role in body
);

export default router;
