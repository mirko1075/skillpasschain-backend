import CertificationRepository from '@v1/repositories/certification.repository';
import { ICertification } from '@v1/models/certification.model';

class CertificationService {
  getAll() {
    return CertificationRepository.findAll();
  }
  getById(id: string) {
    return CertificationRepository.findById(id);
  }
  create(data: ICertification) {
    return CertificationRepository.create(data);
  }
  update(id: string, data: Partial<ICertification>) {
    return CertificationRepository.update(id, data);
  }
  delete(id: string) {
    return CertificationRepository.delete(id);
  }
}

export default new CertificationService();
