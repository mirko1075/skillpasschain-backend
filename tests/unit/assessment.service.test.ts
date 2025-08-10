import { IAssessment } from "@v1/models/assessment.model";
import AssessmentService from "@v1/services/assessment.service";
jest.mock('@v1/repositories/assessment.repository', () => ({
  create: jest.fn().mockResolvedValue({ _id: '1', title: 'Node.js Test', score: 80, takenBy: 'Jane' }),
  findAll: jest.fn().mockResolvedValue([{ _id: '1', title: 'Node.js Test', score: 80, takenBy: 'Jane' }]),
  findById: jest.fn().mockResolvedValue({ _id: '1', title: 'Node.js Test', score: 80, takenBy: 'Jane' }),
  update: jest.fn().mockResolvedValue({ _id: '1', title: 'Node.js Test', score: 80, takenBy: 'Jane' }),
  delete: jest.fn().mockResolvedValue({ _id: '1', title: 'Node.js Test', score: 80, takenBy: 'Jane' })
}));
describe('AssessmentService', () => {
  it('should create assessment', async () => {
    const data: IAssessment = { title: 'Node.js Test', score: 80, takenBy: 'Jane' } as unknown as IAssessment;
    const assessment = await AssessmentService.create(data);
    expect(assessment.title).toBe('Node.js Test');
  });

  it('should get all assessments', async () => {
    const list = await AssessmentService.getAll();
    expect(Array.isArray(list)).toBe(true);
  });
});
