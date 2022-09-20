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
    if (!user) {
      return null;
    }

    return user.toModel();
  }

  async update(
    user: UserModel,
    name: string | undefined,
    socketId: string | undefined,
  ): Promise<boolean> {
    await this.userRepository.update(user.id, {
      ...(name && { name: name }),
      ...{ socket_id: socketId },
      updated_at: new Date(),
    });
    return true;
  }

  async register(user: UserModel): Promise<boolean> {
    const entity = new UserEntity();
    entity.id = user.id;
    entity.name = user.name;
    entity.username = user.username;
    entity.password = user.password;
    entity.created_at = user.createdAt;
    entity.updated_at = user.updatedAt;
    entity.socket_id = user.socketId;
    await this.userRepository.save(entity);
    return true;
  }

  async getByUsername(username: string): Promise<UserModel> {
    const user = await this.userRepository.findOne({
      where: {
        username: username,
      },
    });
    if (!user) {
      return null;
    }
    return user.toModel();
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
