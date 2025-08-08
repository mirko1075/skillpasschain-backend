import AssessmentModel, { IAssessment } from '@v1/models/assessment.model';
import { Types } from 'mongoose';

export default class AssessmentRepository {
  static create(userId: string, skill: string) {
    const assessment = new AssessmentModel({ userId, skill });
    return assessment.save();
  }
  static update(id: string, status: string, score: number) {
    return AssessmentModel.findByIdAndUpdate(
      id,
      { status, score, dateCompleted: new Date() },
      { new: true }
    ).exec();
  }
  static getByUserId(userId: string) {
    return AssessmentModel.find({ userId }).exec();
  }
  async findAll(): Promise<IAssessment[]> {
    return AssessmentModel.find()
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email')
      .exec();
  }

  async findById(id: string): Promise<IAssessment | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return AssessmentModel.findById(id)
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email')
      .exec();
  }

  async create(data: Partial<IAssessment>): Promise<IAssessment> {
    const assessment = new AssessmentModel(data);
    return assessment.save();
  }

  async update(id: string, data: Partial<IAssessment>): Promise<IAssessment | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return AssessmentModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<IAssessment | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return AssessmentModel.findByIdAndDelete(id).exec();
  }
}
