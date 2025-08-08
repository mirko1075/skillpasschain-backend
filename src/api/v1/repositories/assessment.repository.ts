import { Assessment, AssessmentStatus } from '@v1/interfaces/assessment.interface';
import { v4 as uuidv4 } from 'uuid';

let assessments: Assessment[] = [];

export default {
  getByUserId: (userId: string): Assessment[] => assessments.filter(a => a.userId === userId),
  getById: (id: string): Assessment | undefined => assessments.find(a => a.id === id),
  create: (userId: string, skill: string): Assessment => {
    const newAssessment: Assessment = {
      id: uuidv4(),
      userId,
      skill,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    assessments.push(newAssessment);
    return newAssessment;
  },
  updateStatus: (id: string, status: AssessmentStatus, score?: number): Assessment | undefined => {
    const assessment = assessments.find(a => a.id === id);
    if (assessment) {
      assessment.status = status;
      assessment.score = score;
      assessment.updatedAt = new Date();
    }
    return assessment;
  },
};
