import { UserModel } from '../models/user-model';

export abstract class UserRepository {
  abstract get(id: string): Promise<UserModel>;
  abstract update(id: string, data: any): Promise<boolean>;
  abstract register(
    name: string,
    username: string,
    password: string,
  ): Promise<boolean>;
  abstract check(username: string, password: string): Promise<any>;
}
