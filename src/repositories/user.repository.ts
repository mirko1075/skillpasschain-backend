import { User } from '@v1/models/user.model';
import users from  '../mock/users.json';

const getAll = (): User[] => {
  return users;
};

export default {
  getAll
};
