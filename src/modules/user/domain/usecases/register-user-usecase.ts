import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from '../../app/http/dtos/register-user-dto';
import { UserRepository } from '../repositories/user-repository';

@Injectable()
export class RegisterUserUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  async call(data: RegisterUserDto): Promise<boolean> {
    return await this.userRepository.register(
      data.name,
      data.username,
      data.password,
    );
  }
}
