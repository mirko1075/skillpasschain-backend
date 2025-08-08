import { Request, Response } from 'express';
import assessmentService from '@v1/services/assessment.service';

export const createAssessment = (req: Request, res: Response) => {
  const { userId, skill } = req.body;
  if (!userId || !skill) return res.status(400).json({ success: false, message: 'Missing fields' });
  const assessment = assessmentService.createAssessment(userId, skill);
  res.status(201).json(assessment);
};

export const completeAssessment = (req: Request, res: Response) => {
  const { score } = req.body;
  if (score === undefined) return res.status(400).json({ success: false, message: 'Score required' });
  const updated = assessmentService.completeAssessment(req.params.id, score);
  if (!updated) return res.status(404).json({ success: false, message: 'Assessment not found' });
  res.json(updated);
};

export const getUserAssessments = (req: Request, res: Response) => {
  const assessments = assessmentService.getUserAssessments(req.params.userId);
  res.json(assessments);
};
