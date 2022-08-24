import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { UserModel } from '../models/user-model';
import { UserRepository } from '../repositories/user-repository';
import * as brcypt from 'bcrypt';

@Injectable()
export class RegisterUserUsecase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {}

  async call(
    name: string,
    username: string,
    password: string,
  ): Promise<boolean> {
    const model = new UserModel(
      uuidv4(),
      name,
      username,
      brcypt.hashSync(password, 10),
      new Date(),
      new Date(),
    );

    return await this.userRepository.register(model);
  }
}
