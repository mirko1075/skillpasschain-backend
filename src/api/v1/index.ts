import { Router } from 'express';
import userRoutes from '@v1/routes/user.routes';

const router = Router();

// All v1 endpoints here
router.use('/users', userRoutes);

export default router;
