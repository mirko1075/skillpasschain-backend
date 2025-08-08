import UserModel, { IUser } from '@v1/models/user.model';

class UserRepository {
  findAll() {
    return UserModel.find();
  }
  findById(id: string) {
    return UserModel.findById(id);
  }
  create(data: IUser) {
    return UserModel.create(data);
  }
  update(id: string, data: Partial<IUser>) {
    return UserModel.findByIdAndUpdate(id, data, { new: true });
  }
  delete(id: string) {
    return UserModel.findByIdAndDelete(id);
  }
}

export default new UserRepository();
