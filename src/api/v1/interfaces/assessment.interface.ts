export type AssessmentStatus = 'pending' | 'completed' | 'failed';

export interface Assessment {
  id: string;
  userId: string;
  skill: string;
  status: AssessmentStatus;
  score?: number;
  createdAt: Date;
  updatedAt: Date;
}
