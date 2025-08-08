import { Router } from 'express';
import { createAssessment, completeAssessment, getUserAssessments } from '@v1/controllers/assessment.controller';

const router = Router();

router.post('/', createAssessment);
router.put('/:id/complete', completeAssessment);
router.get('/user/:userId', getUserAssessments);

export default router;
