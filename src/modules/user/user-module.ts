import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import database from 'src/config/database';
import user from 'src/config/user';
import { UserController as UserControllerByMe } from './app/http/controllers/me/user-controller';
import { UserController as UserControllerByPublic } from './app/http/controllers/public/user-controller';
import { UserEntity } from './data/database/entities/user-entity';
import { UserDatasource } from './data/database/user-datasource';
import { UserRepositoryImpl } from './data/repositories/user-repository-impl';
import { UserRepository } from './domain/repositories/user-repository';
import { CheckUserPasswordUsecase } from './domain/usecases/check-user-password-usecase';
import { GetUserByUsernameUsecase } from './domain/usecases/get-user-by-username-usecase';
import { GetUserUsecase } from './domain/usecases/get-user-usecase';
import { RegisterUserUsecase } from './domain/usecases/register-user-usecase';
import { UpdateUserPasswordUsecase } from './domain/usecases/update-user-password-usecase';
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
  controllers: [UserControllerByMe, UserControllerByPublic],
  providers: [
    UserDatasource,
    GetUserUsecase,
    UpdateUserUsecase,
    RegisterUserUsecase,
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl,
    },
    CheckUserPasswordUsecase,
    GetUserByUsernameUsecase,
    UpdateUserPasswordUsecase,
  ],
  exports: [CheckUserPasswordUsecase, GetUserByUsernameUsecase],
})
export class UserModule {}
