import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user-repository';

@Injectable()
export class GetUserUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  async call(id: string): Promise<any> {
    return await this.userRepository.get(id);
  }
}
