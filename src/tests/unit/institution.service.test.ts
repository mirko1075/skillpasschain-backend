import { IInstitution } from "@v1/models/institution.model";
import InstitutionService from "@v1/services/institution.service";

jest.mock('@v1/repositories/institution.repository', () => ({
  create: jest.fn().mockResolvedValue({ _id: '1', name: 'Oxford', email: 'contact@ox.ac.uk', address: 'Oxford, UK' }),
  findAll: jest.fn().mockResolvedValue([{ _id: '1', name: 'Oxford', email: 'contact@ox.ac.uk', address: 'Oxford, UK' }]),
  findById: jest.fn().mockResolvedValue({ _id: '1', name: 'Oxford', email: 'contact@ox.ac.uk', address: 'Oxford, UK' }),
  update: jest.fn().mockResolvedValue({ _id: '1', name: 'Oxford', email: 'contact@ox.ac.uk', address: 'Oxford, UK' }),
  delete: jest.fn().mockResolvedValue({ _id: '1', name: 'Oxford', email: 'contact@ox.ac.uk', address: 'Oxford, UK' })
}));
describe('InstitutionService', () => {
  it('should create institution', async () => {
    const data: IInstitution = { name: 'Oxford', email: 'contact@ox.ac.uk', address: 'Oxford, UK' } as IInstitution;
    const institution = await InstitutionService.create(data);
    expect(institution.name).toBe('Oxford');
  });

  it('should get all institutions', async () => {
    const list = await InstitutionService.getAll();
    expect(Array.isArray(list)).toBe(true);
  });
});
