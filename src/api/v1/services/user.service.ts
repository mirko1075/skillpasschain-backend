import UserRepository from '@v1/repositories/user.repository';
import { IUser } from '@v1/models/user.model';

class UserService {
  getAll() {
    return UserRepository.findAll();
  }
  getById(id: string) {
    return UserRepository.findById(id);
  }
  create(data: IUser) {
    return UserRepository.create(data);
  }
  update(id: string, data: Partial<IUser>) {
    return UserRepository.update(id, data);
  }
  delete(id: string) {
    return UserRepository.delete(id);
  }
}

export default new UserService();
