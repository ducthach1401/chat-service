import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { UserModel } from 'src/modules/user/domain/models/user-model';
import { UpdateUserUsecase } from 'src/modules/user/domain/usecases/update-user-usecase';
import { Cache } from 'cache-manager';

@Injectable()
export class HandleConnectionUserUsecase {
  constructor(
    private readonly updateUserUsecase: UpdateUserUsecase,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async call(user: UserModel, socketId: string | undefined): Promise<void> {
    await this.cacheManager.set(socketId, user.id);
    await this.updateUserUsecase.call(user, undefined, socketId);
  }
}
