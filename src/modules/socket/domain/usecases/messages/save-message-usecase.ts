import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/modules/user/domain/models/user-model';
import { MessageModel } from '../../models/message-model';
import { SocketRepository } from '../../repositories/socket-repository';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SaveMessageUsecase {
  constructor(private readonly socketRepository: SocketRepository) {}

  async call(
    sendUser: UserModel,
    receiveUser: UserModel,
    data: string,
  ): Promise<void> {
    const message = new MessageModel(
      uuidv4(),
      sendUser.id,
      receiveUser.id,
      data,
      new Date(),
      new Date(),
    );
    await this.socketRepository.saveMessage(message);
  }
}
