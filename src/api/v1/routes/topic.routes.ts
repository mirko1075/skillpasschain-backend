import { Router } from 'express';
import { createTopic, getAllTopics, getTopicById, updateTopic, deleteTopic } from '@v1/controllers/topic.controller';
import { authenticate } from '@middlewares/authenticate';
import { authorizeRole } from '@middlewares/authorizeRole';

const router = Router();

// Admin only
router.post('/', authenticate, authorizeRole('admin'), createTopic);
router.put('/:id', authenticate, authorizeRole('admin'), updateTopic);
router.delete('/:id', authenticate, authorizeRole('admin'), deleteTopic);

// Public or authenticated access
router.get('/', getAllTopics);
router.get('/:id', getTopicById);

export default router;
