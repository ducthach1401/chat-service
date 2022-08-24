import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user-entity';
import { UserModel } from '../../domain/models/user-model';
import * as brcypt from 'bcrypt';

@Injectable()
export class UserDatasource {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async get(id: string): Promise<UserModel> {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    return user.fromModel();
  }

  async update(user: UserModel, name: string | undefined): Promise<boolean> {
    this.userRepository.update(user.id, {
      ...(name && { name: name }),
      updated_at: new Date(),
    });
    return true;
  }

  async register(user: UserModel): Promise<boolean> {
    const userEntity = UserEntity.toModel(user);
    await this.userRepository.save(userEntity);
    return true;
  }

  async getByUsername(username: string): Promise<UserModel> {
    return (
      await this.userRepository.findOne({
        where: {
          username: username,
        },
      })
    )?.fromModel();
  }

  async checkPassword(user: UserModel, password: string): Promise<boolean> {
    return brcypt.compareSync(password, user.password);
  }

  async updatePassword(user: UserModel, password: string): Promise<boolean> {
    await this.userRepository.update(user.id, {
      password: brcypt.hashSync(password, 10),
    });

    return true;
  }
}
