// src/api/v1/routes/assessment.routes.ts
import { Router } from 'express';
import AssessmentController from '../controllers/assessment.controller';
import { authorizeRole } from '@middlewares/authorizeRole';
import { authenticate } from '@v1/middlewares/auth.middleware';
const router = Router();

router.get('/', authenticate, authorizeRole('admin'), AssessmentController.getAllAssessments); // GET /api/v1/assessments
router.get('/:id', authenticate, authorizeRole('admin'), AssessmentController.getAssessmentById); // GET /api/v1/assessments/:id
router.post('/start', authenticate, authorizeRole('admin'), AssessmentController.startAssessment); // POST /api/v1/assessments/start
router.get('/:assessmentId/questions', authenticate, authorizeRole('admin'), AssessmentController.getNextQuestions); // GET /api/v1/assessments/:assessmentId/questions
router.post('/:assessmentId/submit', authenticate, authorizeRole('admin'), AssessmentController.submitAnswers); // POST /api/v1/assessments/:assessmentId/submit
router.get('/user/:userId', authenticate, authorizeRole('admin'), AssessmentController.getUserAssessments); // GET /api/v1/assessments/user/:userId

export default router;
