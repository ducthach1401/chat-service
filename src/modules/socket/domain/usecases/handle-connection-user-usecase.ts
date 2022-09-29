import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/modules/user/domain/models/user-model';
import { CreateSocketUsecase } from './socket/create-socket-usecase';

@Injectable()
export class HandleConnectionUserUsecase {
  constructor(private readonly createSocketUsecase: CreateSocketUsecase) {}

  async call(user: UserModel, socketId: string | undefined): Promise<void> {
    await this.createSocketUsecase.call(user, socketId);
  }
}
