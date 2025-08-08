import { Request, Response, NextFunction } from 'express';
import InstitutionService from '@v1/services/institution.service';

class InstitutionController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const institutions = await InstitutionService.getAll();
      res.json(institutions);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const institution = await InstitutionService.getById(req.params.id);
      if (!institution) return res.status(404).json({ message: 'Institution not found' });
      res.json(institution);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const institution = await InstitutionService.create(req.body);
      res.status(201).json(institution);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const updated = await InstitutionService.update(req.params.id, req.body);
      if (!updated) return res.status(404).json({ message: 'Institution not found' });
      res.json(updated);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const deleted = await InstitutionService.delete(req.params.id);
      if (!deleted) return res.status(404).json({ message: 'Institution not found' });
      res.json({ message: 'Institution deleted' });
    } catch (error) {
      next(error);
    }
  }
}

export default new InstitutionController();
