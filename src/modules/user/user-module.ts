import { Module } from '@nestjs/common';
import { UserController } from './app/http/controllers/user-controller';
import { UserDatasource } from './data/database/user-datasource';
import { UserRepositoryImpl } from './data/repositories/user-repository-impl';
import { UserRepository } from './domain/repositories/user-repository';
import { GetUserUsecase } from './domain/usecases/get-user-usecase';
import { RegisterUserUsecase } from './domain/usecases/register-user-usecase';
import { UpdateUserUsecase } from './domain/usecases/update-user-usecase';

@Module({
  imports: [],
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
