import { User } from '@v1/interfaces/user.interface';

let mockUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'student', createdAt: new Date() },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'certifier', createdAt: new Date() }
];

export const findAll = () => {
  return mockUsers;
};

export const findById = (id: string) => {
  return mockUsers.find(user => user.id === id) || null;
};
