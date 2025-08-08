import AssessmentModel, { IAssessment } from '@v1/models/assessment.model';

class AssessmentRepository {
  findAll() {
    return AssessmentModel.find().populate('createdBy');
  }
  findById(id: string) {
    return AssessmentModel.findById(id).populate('createdBy');
  }
  create(data: IAssessment) {
    return AssessmentModel.create(data);
  }
  update(id: string, data: Partial<IAssessment>) {
    return AssessmentModel.findByIdAndUpdate(id, data, { new: true }).populate('createdBy');
  }
  delete(id: string) {
    return AssessmentModel.findByIdAndDelete(id);
  }
}

export default new AssessmentRepository();
