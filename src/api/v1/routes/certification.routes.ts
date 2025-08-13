import { Router } from 'express';
import certificationController from '@v1/controllers/certification.controller';

const router = Router();

router.get('/', certificationController.getAll);
router.get('/user/:userId', certificationController.getAllByUser);
router.get('/:id', certificationController.getById);
router.post('/', certificationController.create);
router.put('/:id', certificationController.update);
router.delete('/:id', certificationController.delete);

export default router;
