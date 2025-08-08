import { Request, Response } from 'express';
import certificationService from '@v1/services/certification.service';

export const getUserCertifications = (req: Request, res: Response) => {
  const certs = certificationService.getUserCertifications(req.params.userId);
  res.json(certs);
};
