import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { UserModel } from 'src/modules/user/domain/models/user-model';
import { UpdateUserUsecase } from 'src/modules/user/domain/usecases/update-user-usecase';
import { Cache } from 'cache-manager';
import { DeleteSocketUsecase } from './socket/delete-socket-usecase';

@Injectable()
export class HandleDisconnectionUserUsecase {
  constructor(private readonly deleteSocketUsecase: DeleteSocketUsecase) {}

  async call(user: UserModel, clientId: string): Promise<void> {
    await this.deleteSocketUsecase.call(user, clientId);
  }
}
