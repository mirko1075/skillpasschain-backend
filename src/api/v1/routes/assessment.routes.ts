import { Router } from 'express';
import AssessmentController from '@v1/controllers/assessment.controller';

const router = Router();

router.get('/', AssessmentController.getAll.bind(AssessmentController));
router.get('/:id', AssessmentController.getById.bind(AssessmentController));
router.post('/', AssessmentController.create.bind(AssessmentController));
router.put('/:id', AssessmentController.update.bind(AssessmentController));
router.delete('/:id', AssessmentController.delete.bind(AssessmentController));

export default router;
