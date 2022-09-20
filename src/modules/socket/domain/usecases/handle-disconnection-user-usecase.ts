import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/modules/user/domain/models/user-model';
import { UpdateUserUsecase } from 'src/modules/user/domain/usecases/update-user-usecase';

@Injectable()
export class HandleDisconnectionUserUsecase {
  constructor(private readonly updateUserUsecase: UpdateUserUsecase) {}

  async call(user: UserModel): Promise<void> {
    await this.updateUserUsecase.call(user, undefined, null);
  }
}
