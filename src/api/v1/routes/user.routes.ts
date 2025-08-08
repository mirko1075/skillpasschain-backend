import { Router } from 'express';
import * as UserController from '@v1/controllers/user.controller';

const router = Router();

router.get('/', UserController.getAllUsers);

export default router;
