import { Router } from 'express';
import certificationController from '@v1/controllers/certification.controller';
import { authorizeRole } from '@middlewares/authorizeRole';
import { authenticate } from '@v1/middlewares/auth.middleware';

const router = Router();

router.get('/', authenticate, authorizeRole('admin'), certificationController.getAll);
router.get('/user/:userId', authenticate, authorizeRole('admin'), certificationController.getAllByUser);
router.get('/:id', authenticate, authorizeRole('admin'), certificationController.getById);
router.post('/', authenticate, authorizeRole('admin'), certificationController.create);
router.put('/:id', authenticate, authorizeRole('admin'), certificationController.update);
router.delete('/:id', authenticate, authorizeRole('admin'), certificationController.delete);

export default router;
