import { body } from 'express-validator';

export const createUserValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('name').notEmpty().withMessage('Name is required'),
  body('role').isIn(['student', 'certifier', 'employer', 'recruiter']),
];
