import InstitutionModel, { IInstitution } from '@v1/models/institution.model';

class InstitutionRepository {
  findAll() {
    return InstitutionModel.find();
  }
  findById(id: string) {
    return InstitutionModel.findById(id);
  }
  create(data: IInstitution) {
    return InstitutionModel.create(data);
  }
  update(id: string, data: Partial<IInstitution>) {
    return InstitutionModel.findByIdAndUpdate(id, data, { new: true });
  }
  delete(id: string) {
    return InstitutionModel.findByIdAndDelete(id);
  }
}

export default new InstitutionRepository();
