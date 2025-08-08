import assessmentRepo from '@v1/repositories/assessment.repository';
import certificationRepo from '@v1/repositories/certification.repository';

export default {
  createAssessment: (userId: string, skill: string) => assessmentRepo.create(userId, skill),
  completeAssessment: (id: string, score: number) => {
    const status = score >= 70 ? 'completed' : 'failed';
    const assessment = assessmentRepo.update(id, status, score);

    if (status === 'completed' && assessment) {
      certificationRepo.create(assessment.userId, assessment.skill);
    }
    return assessment;
  },
  getUserAssessments: (userId: string) => assessmentRepo.getByUserId(userId),
};
