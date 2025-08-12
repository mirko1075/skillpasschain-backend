// src/api/v1/repositories/assessment.repository.ts
import Assessment, { IAssessment } from '../models/assessment.model';
import { Types } from 'mongoose';

export default {
  create: (data: Partial<IAssessment>) => Assessment.create(data),
  findAll: () => Assessment.find(),
  findById: (id: string) => Assessment.findById(id),
  findByUser: (userId: string) => Assessment.find({ user: new Types.ObjectId(userId) }),
  update: (id: string, data: Partial<IAssessment>) => Assessment.findByIdAndUpdate(id, data, { new: true })
};
