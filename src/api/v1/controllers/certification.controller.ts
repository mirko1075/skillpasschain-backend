import { Request, Response, NextFunction } from 'express';
import CertificationService from '@v1/services/certification.service';

class CertificationController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const certs = await CertificationService.getAll();
      res.json(certs);
    } catch (error) {
      next(error);
    }
  }

  async getAllByUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;
      const certs = await CertificationService.getAllByUser(userId);
      res.json(certs);
    } catch (error) {
      next(error);
    }
  }
  
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const cert = await CertificationService.getById(req.params.id);
      if (!cert) return res.status(404).json({ message: 'Certification not found' });
      res.json(cert);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const cert = await CertificationService.create(req.body);
      res.status(201).json(cert);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const cert = await CertificationService.update(req.params.id, req.body);
      if (!cert) return res.status(404).json({ message: 'Certification not found' });
      res.json(cert);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const deleted = await CertificationService.delete(req.params.id);
      if (!deleted) return res.status(404).json({ message: 'Certification not found' });
      res.json({ message: 'Certification deleted' });
    } catch (error) {
      next(error);
    }
  }
}

export default new CertificationController();
