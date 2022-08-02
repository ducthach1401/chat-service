import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import database from 'src/config/database';
import user from 'src/config/user';
import { UserController } from './app/http/controllers/user-controller';
import { UserEntity } from './data/database/entities/user-entity';
import { UserDatasource } from './data/database/user-datasource';
import { UserRepositoryImpl } from './data/repositories/user-repository-impl';
import { UserRepository } from './domain/repositories/user-repository';
import { GetUserUsecase } from './domain/usecases/get-user-usecase';
import { RegisterUserUsecase } from './domain/usecases/register-user-usecase';
import { UpdateUserUsecase } from './domain/usecases/update-user-usecase';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [database, user],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get<TypeOrmModuleOptions>(
          'database',
        ) as TypeOrmModuleOptions,
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [UserController],
  providers: [
    UserDatasource,
    GetUserUsecase,
    UpdateUserUsecase,
    RegisterUserUsecase,
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl,
    },
  ],
})
export class UserModule {}
