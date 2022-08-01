import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user-repository';

@Injectable()
export class UpdateUserUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  async call(id: string, data: any): Promise<any> {
    return await this.userRepository.update(id, data);
  }
}
