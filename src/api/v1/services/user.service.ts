import users from '@v1/models/user.model';
import { User } from '@v1/interfaces/user.interface';

class UserService {
  getAllUsers(): User[] {
    return users;
  }

  getUserById(id: string): User | undefined {
    return users.find((user: User) => user.id === id);
  }

  createUser(name: string, email: string): User {
    const newUser: User = {
      id: crypto.randomUUID(),
      name,
      email,
      createdAt: new Date(),
    };

    users.push(newUser);
    return newUser;
  }
}

export default new UserService();
