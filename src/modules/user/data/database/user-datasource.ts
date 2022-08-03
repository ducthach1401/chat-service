import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user-entity';
import * as brcypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { UserModel } from '../../domain/models/user-model';
import { RoleType } from 'src/core/enums/role-type';

@Injectable()
export class UserDatasource {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
  ) {}

  async get(id: string): Promise<UserModel> {
    const user = await this.userEntityRepository.findOne({
      where: {
        id: id,
      },
    });
    return user.fromModel();
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

  async check(username: string, password: string): Promise<any> {
    const user = await this.userEntityRepository.findOne({
      username: username,
    });

    if (!user) {
      throw new HttpException('Username or password wrong', 400);
    }

    const check = brcypt.compareSync(password, user.password);
    if (!check) {
      throw new HttpException('Username or password wrong', 400);
    }

    return {
      id: user.id,
      role: RoleType.User,
    };
  }
}
