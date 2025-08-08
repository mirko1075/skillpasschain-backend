import { User } from '@v1/interfaces/user.interface';
import { v4 as uuidv4 } from 'uuid';

const users: User[] = [
  {
    id: uuidv4(),
    name: 'Alice Johnson',
    email: 'alice@example.com',
    createdAt: new Date(),
  },
  {
    id: uuidv4(),
    name: 'Bob Smith',
    email: 'bob@example.com',
    createdAt: new Date(),
  },
];

export default users;
