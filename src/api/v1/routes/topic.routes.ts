import { Router } from 'express';
import topicController from '@v1/controllers/topic.controller';

const router = Router();

// Admin only
router.get('/', topicController.getAllTopics);
router.post('/', topicController.createTopic);
router.put('/:id', topicController.updateTopic);
router.delete('/:id', topicController.deleteTopic);


export default router;
