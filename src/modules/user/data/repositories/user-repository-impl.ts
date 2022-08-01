import { UserRepository } from '../../domain/repositories/user-repository';
import { UserDatasource } from '../database/user-datasource';

export class UserRepositoryImpl extends UserRepository {
  constructor(private readonly userDatasource: UserDatasource) {
    super();
  }

  async get(id: string): Promise<any> {
    return await this.userDatasource.get(id);
  }

  async register(data: any): Promise<boolean> {
    return await this.userDatasource.register(data);
  }

  async update(id: string, data: any): Promise<boolean> {
    return await this.userDatasource.update(id, data);
  }
}
