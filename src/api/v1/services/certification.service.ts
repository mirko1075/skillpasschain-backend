import certificationRepo from '@v1/repositories/certification.repository';

export default {
  getUserCertifications: (userId: string) => certificationRepo.getByUserId(userId),
};
