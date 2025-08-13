import { Request, Response, NextFunction } from 'express';
import Topic from '@v1/models/topic.model';
import { ApiError } from 'errors/ApiError';

class TopicController {
  async createTopic(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description, levels, isActive, referenceDocumentUrl } = req.body;

      const topic = await Topic.create({
        name,
        description,
        levels,
        isActive,
        referenceDocumentUrl,
        createdBy: (req as any).user._id
      });

      res.status(201).json(topic);
    } catch (error) {
      next(error);
    }
  };

  async getAllTopics(_req: Request, res: Response, next: NextFunction) {
    try {
      const topics = await Topic.find();
      res.json(topics);
    } catch (error) {
      next(error);
    }
  };

  async getTopicById(req: Request, res: Response, next: NextFunction) {
    try {
      const topic = await Topic.findById(req.params.id);
      if (!topic) throw new ApiError(404, 'Topic not found');
      res.json(topic);
    } catch (error) {
      next(error);
    }
  };

  async updateTopic(req: Request, res: Response, next: NextFunction) {
    try {
      const topic = await Topic.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!topic) throw new ApiError(404, 'Topic not found');
      res.json(topic);
    } catch (error) {
      next(error);
    }
  };

  async deleteTopic(req: Request, res: Response, next: NextFunction) {
    try {
      const topic = await Topic.findByIdAndDelete(req.params.id);
      if (!topic) throw new ApiError(404, 'Topic not found');
      res.json({ message: 'Topic deleted' });
    } catch (error) {
      next(error);
    }
  };
}
export default new TopicController();