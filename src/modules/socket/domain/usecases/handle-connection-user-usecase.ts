import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/modules/user/domain/models/user-model';
import { UpdateUserUsecase } from 'src/modules/user/domain/usecases/update-user-usecase';
import { CreateSocketUsecase } from './socket/create-socket-usecase';

@Injectable()
export class HandleConnectionUserUsecase {
  constructor(
    private readonly createSocketUsecase: CreateSocketUsecase,
    private readonly updateUserUsecase: UpdateUserUsecase,
  ) {}

  async call(user: UserModel, socketId: string | undefined): Promise<void> {
    await this.createSocketUsecase.call(user, socketId);
    await this.updateUserUsecase.call(user, undefined, true);
  }
}
