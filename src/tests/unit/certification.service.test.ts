import CertificationService from '@v1/services/certification.service';
import { ICertification } from '../../api/v1/models/certification.model';
import { Types } from 'mongoose';

jest.mock('@v1/repositories/certification.repository', () => ({
  create: jest.fn().mockResolvedValue({ _id: '1', title: 'React Developer', issuedBy: '1', issueDate: new Date(), recipient: '1' }),
  findAll: jest.fn().mockResolvedValue([{ _id: '1', title: 'React Developer', issuedBy: '1', issueDate: new Date(), recipient: '1' }]),
  findById: jest.fn().mockResolvedValue({ _id: '1', title: 'React Developer', issuedBy: '1', issueDate: new Date(), recipient: '1' }),
}));
describe('CertificationService', () => {
  it('should create certification', async () => {
    const data: ICertification = { _id: new Types.ObjectId(), title: 'React Developer', issuedBy: new Types.ObjectId(), issueDate: new Date(), recipient: new Types.ObjectId() } as  ICertification;
    const cert = await CertificationService.create(data);
    expect(cert.title).toBe('React Developer');
  });

  it('should get all certifications', async () => {
    const list = await CertificationService.getAll();
    expect(Array.isArray(list)).toBe(true);
  });
});
