import { Router } from 'express';
import userController from '@v1/controllers/user.controller';
import { authenticate } from '@middlewares/authenticate';
import { authorizeRole } from '@middlewares/authorizeRole';
import { upload } from '@middlewares/upload';

const router = Router();

router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.post('/', userController.create);
router.post(
  '/create-admin',
  authenticate,
  authorizeRole('admin'),
  userController.create
);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);
router.get('/:id/avatar', userController.getAvatar);
router.post('/:id/avatar', upload.single('avatar'), userController.uploadAvatar);

export default router;
