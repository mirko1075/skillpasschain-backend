// src/api/v1/repositories/assessment.repository.ts
import Assessment, { IAssessment } from '../models/assessment.model';
import { Types } from 'mongoose';

export default {
  create: (data: Partial<IAssessment>) => Assessment.create(data),
  findAll: () => Assessment.find(),
  findById: (id: string) => Assessment.findById(id),
  findByUser: (userId: string) => Assessment.find({ user: new Types.ObjectId(userId) }),
  update: (id: string, data: Partial<IAssessment>) => Assessment.findByIdAndUpdate(id, data, { new: true }),
  delete: (id: string) => Assessment.findByIdAndDelete(id),
  findByTopic: (topicId: string) => Assessment.find({ topic: new Types.ObjectId(topicId) }),
  findByUserAndTopic: (userId: string, topicId: string) => 
    Assessment.findOne({ user: new Types.ObjectId(userId), topic: new Types.ObjectId(topicId) }),
  findAllByStatus: (status: 'in-progress' | 'completed' | 'failed') => 
    Assessment.find({ status }).populate('user topic'),
  findAllByUserAndStatus: (userId: string, status: 'in-progress' | 'completed' | 'failed') => 
    Assessment.find({ user: new Types.ObjectId(userId), status }).populate('user topic'),
};
