import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user-repository';

@Injectable()
export class RegisterUserUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  async call(data: any): Promise<boolean> {
    return await this.userRepository.register(data);
  }
}
