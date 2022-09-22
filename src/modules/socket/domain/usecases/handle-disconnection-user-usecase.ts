import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { UserModel } from 'src/modules/user/domain/models/user-model';
import { UpdateUserUsecase } from 'src/modules/user/domain/usecases/update-user-usecase';
import { Cache } from 'cache-manager';

@Injectable()
export class HandleDisconnectionUserUsecase {
  constructor(
    private readonly updateUserUsecase: UpdateUserUsecase,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async call(user: UserModel): Promise<void> {
    if (user.socketId) {
      await this.cacheManager.del(user.socketId);
    }
    await this.updateUserUsecase.call(user, undefined, null);
  }
}
