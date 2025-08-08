import { Router } from 'express';
import CertificationController from '@v1/controllers/certification.controller';

const router = Router();

router.get('/', CertificationController.getAll.bind(CertificationController));
router.get('/:id', CertificationController.getById.bind(CertificationController));
router.post('/', CertificationController.create.bind(CertificationController));
router.put('/:id', CertificationController.update.bind(CertificationController));
router.delete('/:id', CertificationController.delete.bind(CertificationController));

export default router;
