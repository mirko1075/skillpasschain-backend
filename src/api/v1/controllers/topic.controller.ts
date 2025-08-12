import { Request, Response, NextFunction } from 'express';
import Topic from '@v1/models/topic.model';
import { ApiError } from 'errors/ApiError';

export const createTopic = async (req: Request, res: Response, next: NextFunction) => {
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

export const getAllTopics = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const topics = await Topic.find();
    res.json(topics);
  } catch (error) {
    next(error);
  }
};

export const getTopicById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) throw new ApiError(404, 'Topic not found');
    res.json(topic);
  } catch (error) {
    next(error);
  }
};

export const updateTopic = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const topic = await Topic.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!topic) throw new ApiError(404, 'Topic not found');
    res.json(topic);
  } catch (error) {
    next(error);
  }
};

export const deleteTopic = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const topic = await Topic.findByIdAndDelete(req.params.id);
    if (!topic) throw new ApiError(404, 'Topic not found');
    res.json({ message: 'Topic deleted' });
  } catch (error) {
    next(error);
  }
};
