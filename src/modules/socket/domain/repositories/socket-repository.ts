import { UserModel } from 'src/modules/user/domain/models/user-model';
import { MessageModel } from '../models/message-model';

export abstract class SocketRepository {
  abstract saveMessage(message: MessageModel): Promise<void>;
  abstract getMessages(
    sendUser: UserModel,
    receiveUser: UserModel,
  ): Promise<MessageModel[]>;
}
