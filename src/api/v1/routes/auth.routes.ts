import { Router } from 'express';
import * as AuthController from '@v1/controllers/auth.controller';
import { authenticate } from '@v1/middlewares/auth.middleware';
import { authorizeRole } from '@middlewares/authorizeRole';
import { register } from '@v1/controllers/auth.controller';

const router = Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/refresh', AuthController.refreshToken);
router.post('/logout', authenticate, AuthController.logout);
router.post(
  '/create-admin',
  authenticate,
  authorizeRole('admin'),
  register // This will pass "admin" role in body
);

export default router;
