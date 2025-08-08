import InstitutionModel, { IInstitution } from '@v1/models/institution.model';
import { Types } from 'mongoose';

export default class InstitutionRepository {
  async findAll(): Promise<IInstitution[]> {
    return InstitutionModel.find().exec();
  }

  async findById(id: string): Promise<IInstitution | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return InstitutionModel.findById(id).exec();
  }

  async create(data: Partial<IInstitution>): Promise<IInstitution> {
    const institution = new InstitutionModel(data);
    return institution.save();
  }

  async update(id: string, data: Partial<IInstitution>): Promise<IInstitution | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return InstitutionModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<IInstitution | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return InstitutionModel.findByIdAndDelete(id).exec();
  }
}
