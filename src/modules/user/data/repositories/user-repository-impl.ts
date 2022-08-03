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

  async register(
    name: string,
    username: string,
    password: string,
  ): Promise<boolean> {
    return await this.userDatasource.register(name, username, password);
  }

  async update(id: string, data: any): Promise<boolean> {
    return await this.userDatasource.update(id, data);
  }

  async check(username: string, password: string): Promise<any> {
    return await this.userDatasource.check(username, password);
  }
}
