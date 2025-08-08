import CertificationModel, { ICertification } from '@v1/models/certification.model';

class CertificationRepository {
  findAll() {
    return CertificationModel.find().populate('issuedBy recipient');
  }
  findById(id: string) {
    return CertificationModel.findById(id).populate('issuedBy recipient');
  }
  create(data: ICertification) {
    return CertificationModel.create(data);
  }
  update(id: string, data: Partial<ICertification>) {
    return CertificationModel.findByIdAndUpdate(id, data, { new: true }).populate('issuedBy recipient');
  }
  delete(id: string) {
    return CertificationModel.findByIdAndDelete(id);
  }
}

export default new CertificationRepository();
