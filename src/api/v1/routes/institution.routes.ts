import { Router } from 'express';
import institutionController from '@v1/controllers/institution.controller';
import { authorizeRole } from '@middlewares/authorizeRole';
import { authenticate } from '@v1/middlewares/auth.middleware';

const router = Router();

router.get('/', authenticate, authorizeRole('admin'), institutionController.getAll);
router.get('/:id', authenticate, authorizeRole('admin'), institutionController.getById);
router.post('/', authenticate, authorizeRole('admin'), institutionController.create);
router.put('/:id', authenticate, authorizeRole('admin'), institutionController.update);
router.delete('/:id', authenticate, authorizeRole('admin'), institutionController.delete);

export default router;
