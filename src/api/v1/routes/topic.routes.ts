import { Router } from 'express';
import topicController from '@v1/controllers/topic.controller';
import { authorizeRole } from '@middlewares/authorizeRole';
import { authenticate } from '@v1/middlewares/auth.middleware';

const router = Router();

// Admin only
router.get('/', authenticate, authorizeRole('admin'), topicController.getAllTopics);
router.post('/', authenticate, authorizeRole('admin'), topicController.createTopic);
router.put('/:id', authenticate, authorizeRole('admin'), topicController.updateTopic);
router.delete('/:id', authenticate, authorizeRole('admin'), topicController.deleteTopic);


export default router;
