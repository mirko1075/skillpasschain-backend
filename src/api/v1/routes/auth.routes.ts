import { Router } from 'express';
import * as AuthController from '@v1/controllers/auth.controller';
import { authenticate } from '@v1/middlewares/auth.middleware';

const router = Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/refresh', AuthController.refreshToken);
router.post('/logout', authenticate, AuthController.logout);

export default router;
