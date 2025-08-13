// src/api/v1/routes/assessment.routes.ts
import { Router } from 'express';
import AssessmentController from '../controllers/assessment.controller';
const router = Router();

router.get('/',  AssessmentController.getAllAssessments); // GET /api/v1/assessments
router.get('/:id', AssessmentController.getAssessmentById); // GET /api/v1/assessments/:id
router.post('/start', AssessmentController.startAssessment); // POST /api/v1/assessments/start
router.get('/:assessmentId/questions', AssessmentController.getNextQuestions); // GET /api/v1/assessments/:assessmentId/questions
router.post('/:assessmentId/submit', AssessmentController.submitAnswers); // POST /api/v1/assessments/:assessmentId/submit
router.get('/user/:userId', AssessmentController.getUserAssessments); // GET /api/v1/assessments/user/:userId

export default router;
