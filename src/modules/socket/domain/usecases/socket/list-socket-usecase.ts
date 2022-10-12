import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/modules/user/domain/models/user-model';
import { SocketClientModel } from '../../models/socket-client-model';
import { SocketRepository } from '../../repositories/socket-repository';

@Injectable()
export class ListSocketUsecase {
  constructor(private readonly socketRepository: SocketRepository) {}

  async call(
    sendUser: UserModel,
    receiveUser: UserModel,
  ): Promise<SocketClientModel[]> {
    return await this.socketRepository.listSocket(sendUser, receiveUser);
  }
}
