import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/modules/user/domain/models/user-model';
import { DeleteSocketUsecase } from './socket/delete-socket-usecase';

@Injectable()
export class HandleDisconnectionUserUsecase {
  constructor(private readonly deleteSocketUsecase: DeleteSocketUsecase) {}

  async call(user: UserModel, clientId: string): Promise<void> {
    await this.deleteSocketUsecase.call(user, clientId);
  }
}
