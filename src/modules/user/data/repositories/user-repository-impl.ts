import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user-repository';
import { UserDatasource } from '../database/user-datasource';

@Injectable()
export class UserRepositoryImpl extends UserRepository {
  constructor(private readonly userDatasource: UserDatasource) {
    super();
  }

  async get(id: string): Promise<any> {
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
}
