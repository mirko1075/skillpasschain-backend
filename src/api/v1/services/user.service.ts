import UserRepository from '@repositories/user.repository';
import { User } from '@v1/models/user.model';

const getAllUsers = (): User[] => {
  return UserRepository.getAll();
};

export default {
  getAllUsers
};
