import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/modules/user/domain/models/user-model';
import { UpdateUserUsecase } from 'src/modules/user/domain/usecases/update-user-usecase';
import { DeleteSocketUsecase } from './socket/delete-socket-usecase';

@Injectable()
export class HandleDisconnectionUserUsecase {
  constructor(
    private readonly deleteSocketUsecase: DeleteSocketUsecase,
    private readonly updateUserUsecase: UpdateUserUsecase,
  ) {}

  async call(user: UserModel, clientId: string): Promise<void> {
    await this.deleteSocketUsecase.call(user, clientId);
    await this.updateUserUsecase.call(user, undefined, false);
  }
}
