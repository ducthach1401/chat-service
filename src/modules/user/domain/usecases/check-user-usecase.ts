import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user-repository';

@Injectable()
export class CheckUserUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  async call(username: string, password: string): Promise<any> {
    return await this.userRepository.check(username, password);
  }
}
