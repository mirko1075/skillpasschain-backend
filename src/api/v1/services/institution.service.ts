import InstitutionRepository from '@v1/repositories/institution.repository';
import { IInstitution } from '@v1/models/institution.model';

class InstitutionService {
  getAll() {
    return InstitutionRepository.findAll();
  }
  getById(id: string) {
    return InstitutionRepository.findById(id);
  }
  create(data: IInstitution) {
    return InstitutionRepository.create(data);
  }
  update(id: string, data: Partial<IInstitution>) {
    return InstitutionRepository.update(id, data);
  }
  delete(id: string) {
    return InstitutionRepository.delete(id);
  }
}

export default new InstitutionService();
