// src/api/v1/routes/assessment.routes.ts
import { Router } from 'express';
import {
  startAssessment,
  getNextQuestions,
  submitAnswers,
  getUserAssessments
} from '../controllers/assessment.controller';

const router = Router();

router.post('/start', startAssessment); // POST /api/v1/assessments/start
router.get('/:assessmentId/questions', getNextQuestions); // GET /api/v1/assessments/:assessmentId/questions
router.post('/:assessmentId/submit', submitAnswers); // POST /api/v1/assessments/:assessmentId/submit
router.get('/user/:userId', getUserAssessments); // GET /api/v1/assessments/user/:userId

export default router;
