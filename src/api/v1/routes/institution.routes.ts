import { Router } from 'express';
import InstitutionController from '@v1/controllers/institution.controller';

const router = Router();

router.get('/', InstitutionController.getAll.bind(InstitutionController));
router.get('/:id', InstitutionController.getById.bind(InstitutionController));
router.post('/', InstitutionController.create.bind(InstitutionController));
router.put('/:id', InstitutionController.update.bind(InstitutionController));
router.delete('/:id', InstitutionController.delete.bind(InstitutionController));

export default router;
