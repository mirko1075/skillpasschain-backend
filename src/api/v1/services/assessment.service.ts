import AssessmentRepository from '@v1/repositories/assessment.repository';
import { IAssessment } from '@v1/models/assessment.model';

class AssessmentService {
  getAll() {
    return AssessmentRepository.findAll();
  }
  getById(id: string) {
    return AssessmentRepository.findById(id);
  }
  create(data: IAssessment) {
    return AssessmentRepository.create(data);
  }
  update(id: string, data: Partial<IAssessment>) {
    return AssessmentRepository.update(id, data);
  }
  delete(id: string) {
    return AssessmentRepository.delete(id);
  }
}

export default new AssessmentService();
