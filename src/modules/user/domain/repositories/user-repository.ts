import { UserModel } from '../models/user-model';

export abstract class UserRepository {
  abstract get(id: string): Promise<UserModel>;

  abstract getByUsername(username: string): Promise<UserModel>;

  abstract update(
    user: UserModel,
    name: string | undefined,
    socketId: string | undefined,
  ): Promise<boolean>;

  abstract register(user: UserModel): Promise<boolean>;

  abstract checkPassword(user: UserModel, password: string): Promise<boolean>;

  abstract updatePassword(user: UserModel, password: string): Promise<boolean>;
}
