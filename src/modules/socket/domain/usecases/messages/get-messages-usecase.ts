import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/modules/user/domain/models/user-model';
import { MessageModel } from '../../models/message-model';
import { SocketRepository } from '../../repositories/socket-repository';

@Injectable()
export class GetMessagesUsecase {
  constructor(private readonly socketRepository: SocketRepository) {}

  async call(
    sendUser: UserModel,
    receiveUser: UserModel,
  ): Promise<MessageModel[]> {
    return await this.socketRepository.getMessages(sendUser, receiveUser);
  }
}
