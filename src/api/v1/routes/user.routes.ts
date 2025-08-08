import { Router } from 'express';
import { getAllUsers, getUserById, createUser } from '@v1/controllers/user.controller';
import { validateRequest } from '@v1/middlewares/validateRequest';
import { createUserValidation } from '@v1/validations/user.validation';

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUserValidation, validateRequest, createUser);

export default router;
