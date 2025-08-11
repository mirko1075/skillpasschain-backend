import { Router } from 'express';
import { authenticate } from '@middlewares/authenticate';
import { authorizeRole } from '@middlewares/authorizeRole';
import { register } from '@v1/controllers/auth.controller';

const router = Router();

router.post(
  '/create-admin',
  authenticate,
  authorizeRole('admin'),
  register // This will pass "admin" role in body
);

export default router;