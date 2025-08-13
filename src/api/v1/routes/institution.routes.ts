import { Router } from 'express';
import InstitutionController from '@v1/controllers/institution.controller';
import { authenticate } from '@middlewares/authenticate';
import { authorizeRole } from '@middlewares/authorizeRole';
import institutionController from '@v1/controllers/institution.controller';

const router = Router();

router.get('/', authenticate, authorizeRole('admin'), institutionController.getAll);
router.get('/:id', authenticate, authorizeRole('admin'), institutionController.getById);
router.post('/', authenticate, authorizeRole('admin'), institutionController.create);
router.put('/:id', authenticate, authorizeRole('admin'), institutionController.update);
router.delete('/:id', authenticate, authorizeRole('admin'), institutionController.delete);

export default router;
