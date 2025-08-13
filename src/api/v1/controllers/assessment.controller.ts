// src/api/v1/controllers/assessment.controller.ts
import { Request, Response } from 'express';
import AssessmentService from '../services/assessment.service';

class AssessmentController {
  async getAllAssessments(req: Request, res: Response) {
    try {
      const assessments = await AssessmentService.getAll();
      res.json(assessments);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };
  async getAssessmentById(req: Request, res: Response) {
    try {
      const assessment = await AssessmentService.getById(req.params.id);
      if (!assessment) return res.status(404).json({ message: 'Assessment not found' });
      res.json(assessment);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };
  async startAssessment(req: Request, res: Response) {
    try {
      const { userId, topicId, passThreshold } = req.body;
      const assessment = await AssessmentService.startAssessment(userId, topicId, passThreshold);
      res.status(201).json(assessment);
    } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

  async getNextQuestions(req: Request, res: Response) {
  try {
    const { assessmentId } = req.params;
    const questions = await AssessmentService.getNextQuestions(assessmentId);
    res.json({ questions });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

async submitAnswers(req: Request, res: Response) {
  try {
    const { assessmentId } = req.params;
    const { answers } = req.body;
    const updated = await AssessmentService.submitAnswers(assessmentId, answers);
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

async getUserAssessments(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const list = await AssessmentService.getUserAssessments(userId);
    res.json(list);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
}

export default new AssessmentController();

