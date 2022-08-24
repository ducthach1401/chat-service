import { Injectable } from '@nestjs/common';
import { UserModel } from '../models/user-model';
import { UserRepository } from '../repositories/user-repository';

@Injectable()
export class UpdateUserPasswordUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  async call(user: UserModel, password: string): Promise<boolean> {
    return await this.userRepository.updatePassword(user, password);
  }
}
