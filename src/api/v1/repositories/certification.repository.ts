import CertificationModel, { ICertification } from '@v1/models/certification.model';
import { Types } from 'mongoose';

export default class CertificationRepository {
  static create(userId: any, skill: any) {
    const certification = new CertificationModel({ issuedTo: userId, skill });
    return certification.save();
  }
  async findAll(): Promise<ICertification[]> {
    return CertificationModel.find()
      .populate('issuedTo', 'name email')
      .populate('issuedBy', 'name email')
      .exec();
  }

  async findById(id: string): Promise<ICertification | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return CertificationModel.findById(id)
      .populate('issuedTo', 'name email')
      .populate('issuedBy', 'name email')
      .exec();
  }

  async create(data: Partial<ICertification>): Promise<ICertification> {
    const cert = new CertificationModel(data);
    return cert.save();
  }

  async update(id: string, data: Partial<ICertification>): Promise<ICertification | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return CertificationModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<ICertification | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return CertificationModel.findByIdAndDelete(id).exec();
  }
}
