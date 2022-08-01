import { Injectable } from '@nestjs/common';

@Injectable()
export class UserDatasource {
  async get(id: string): Promise<any> {}

  async update(id: string, data: any): Promise<boolean> {
    return true;
  }

  async register(data: any): Promise<boolean> {
    return true;
  }
}
