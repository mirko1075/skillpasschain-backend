import { Router } from 'express';
import UserController from '@v1/controllers/user.controller';
import userController from '@v1/controllers/user.controller';

const router = Router();

router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.post('/', userController.create);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

export default router;
