import { PaginationParams } from 'src/core/models/pagination-params';
import { SortParams } from 'src/core/models/sort-params';
import { UserModel } from 'src/modules/user/domain/models/user-model';
import { MessageModel } from '../models/message-model';
import { SocketClientModel } from '../models/socket-client-model';

export abstract class SocketRepository {
  abstract saveMessage(message: MessageModel): Promise<void>;

  abstract getMessages(
    sendUser: UserModel,
    receiveUser: UserModel,
    paginationParams: PaginationParams,
    sortParams: SortParams,
    search: string | undefined,
  ): Promise<MessageModel[]>;

  abstract saveSocket(socket: SocketClientModel): Promise<void>;

  abstract listSocket(user: UserModel): Promise<SocketClientModel[]>;
  
  abstract deleteSocket(
    user: UserModel,
    socket: string | undefined,
  ): Promise<void>;
}
