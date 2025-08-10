import UserService from '../../src/api/v1/services/user.service';
import { IUser } from '../../src/api/v1/models/user.model';
jest.mock('@v1/repositories/user.repository', () => ({
  create: jest.fn().mockResolvedValue({ _id: '1', firstName: 'John', lastName: 'Doe', email: 'test@test.com' }),
  findAll: jest.fn().mockResolvedValue([{ _id: '1', firstName: 'John', lastName: 'Doe' }]),
  findById: jest.fn().mockResolvedValue({ _id: '1', firstName: 'John', lastName: 'Doe', email: 'test@test.com' }),
  update: jest.fn().mockResolvedValue({ _id: '1', firstName: 'John', lastName: 'Doe', email: 'test@test.com' }),
  delete: jest.fn().mockResolvedValue({ _id: '1', firstName: 'John', lastName: 'Doe', email: 'test@test.com' })
}));
describe('UserService', () => {
  it('should create a user', async () => {
    const mockUser: IUser = { firstName: 'Unit', lastName: 'Test', email: 'unit@example.com' } as IUser;
    const createdUser = await UserService.create(mockUser);
    expect(createdUser.firstName).toBe('John');
    expect(createdUser.lastName).toBe('Doe');
  });

  it('should get all users', async () => {
    const users = await UserService.getAll();
    expect(Array.isArray(users)).toBe(true);
  });
});
