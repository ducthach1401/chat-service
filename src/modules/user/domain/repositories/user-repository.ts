import { UserModel } from '../models/user-model';

export abstract class UserRepository {
  abstract get(id: string): Promise<UserModel>;
  abstract update(
    id: string,
    name: string | undefined,
    password: string | undefined,
  ): Promise<boolean>;
  abstract register(
    name: string,
    username: string,
    password: string,
  ): Promise<boolean>;
  abstract check(username: string, password: string): Promise<any>;
}
