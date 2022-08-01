import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user-entity';

@Injectable()
export class UserDatasource {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
  ) {}

  async get(id: string): Promise<any> {
    const user = await this.userEntityRepository.findOne({
      where: {
        id: id,
      },
    });
    return user;
  }

  async update(id: string, data: any): Promise<boolean> {
    await this.userEntityRepository.update({ id: id }, data);
    return true;
  }

  async register(data: any): Promise<boolean> {
    const userEntity = UserEntity.toModel(data);
    await this.userEntityRepository.save(userEntity);
    return true;
  }
}
