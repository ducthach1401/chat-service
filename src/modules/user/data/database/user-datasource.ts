import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user-entity';
import * as brcypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserDatasource {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
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

  async register(
    name: string,
    username: string,
    password: string,
  ): Promise<boolean> {
    const salt = Number(this.configService.get<number>('user.salt'));
    const check = await this.userEntityRepository.findOne({
      username: username,
    });
    if (check) {
      throw new HttpException('Duplicate username', 400);
    }
    password = brcypt.hashSync(password, salt);
    const userEntity = UserEntity.toData(name, username, password);
    await this.userEntityRepository.save(userEntity);
    return true;
  }
}
