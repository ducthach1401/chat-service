import { Injectable } from '@nestjs/common';
import { UserModel } from '../../domain/models/user-model';
import { UserRepository } from '../../domain/repositories/user-repository';
import { UserDatasource } from '../database/user-datasource';

@Injectable()
export class UserRepositoryImpl extends UserRepository {
  constructor(private readonly userDatasource: UserDatasource) {
    super();
  }

  async get(id: string): Promise<UserModel> {
    return await this.userDatasource.get(id);
  }

  async getByUsername(username: string): Promise<UserModel> {
    return await this.userDatasource.getByUsername(username);
  }

  async update(
    user: UserModel,
    name: string | undefined,
    socketId: string | undefined,
  ): Promise<boolean> {
    return await this.userDatasource.update(user, name, socketId);
  }

  async register(user: UserModel): Promise<boolean> {
    return await this.userDatasource.register(user);
  }

  async updatePassword(user: UserModel, password: string): Promise<boolean> {
    return await this.userDatasource.updatePassword(user, password);
  }

  async checkPassword(user: UserModel, password: string): Promise<boolean> {
    return await this.userDatasource.checkPassword(user, password);
  }
}
