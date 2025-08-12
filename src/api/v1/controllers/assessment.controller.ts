import { Request, Response, NextFunction } from 'express';
import AssessmentService from '@v1/services/assessment.service';

class AssessmentController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const assessments = await AssessmentService.getAll();
      res.json(assessments);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const assessment = await AssessmentService.getById(req.params.id);
      if (!assessment) return res.status(404).json({ message: 'Assessment not found' });
      res.json(assessment);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const assessment = await AssessmentService.create(req.body);
      res.status(201).json(assessment);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const updated = await AssessmentService.update(req.params.id, req.body);
      if (!updated) return res.status(404).json({ message: 'Assessment not found' });
      res.json(updated);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const deleted = await AssessmentService.delete(req.params.id);
      if (!deleted) return res.status(404).json({ message: 'Assessment not found' });
      res.json({ message: 'Assessment deleted' });
    } catch (error) {
      next(error);
    }
  }

  async getAllByUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;
      const assessments = await AssessmentService.getAllByUser(userId);
      res.json(assessments);
    } catch (error) {
      next(error);
    }
  }
}

export default new AssessmentController();
