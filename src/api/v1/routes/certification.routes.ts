import { Router } from 'express';
import { getUserCertifications } from '@v1/controllers/certification.controller';

const router = Router();

router.get('/user/:userId', getUserCertifications);

export default router;
