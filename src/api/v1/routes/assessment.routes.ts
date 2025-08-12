// src/api/v1/routes/assessment.routes.ts
import { Router } from 'express';
import {
  startAssessment,
  getNextQuestions,
  submitAnswers,
  getUserAssessments,
  getAssessmentById,
  getAllAssessments
} from '../controllers/assessment.controller';

const router = Router();

router.get('/',  getAllAssessments); // GET /api/v1/assessments
router.get('/:id', getAssessmentById); // GET /api/v1/assessments/:id
router.post('/start', startAssessment); // POST /api/v1/assessments/start
router.get('/:assessmentId/questions', getNextQuestions); // GET /api/v1/assessments/:assessmentId/questions
router.post('/:assessmentId/submit', submitAnswers); // POST /api/v1/assessments/:assessmentId/submit
router.get('/user/:userId', getUserAssessments); // GET /api/v1/assessments/user/:userId

export default router;
