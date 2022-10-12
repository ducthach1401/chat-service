import { Injectable } from '@nestjs/common';
import { PaginationParams } from 'src/core/models/pagination-params';
import { SortParams } from 'src/core/models/sort-params';
import { UserModel } from 'src/modules/user/domain/models/user-model';
import { MessageModel } from '../../domain/models/message-model';
import { SocketClientModel } from '../../domain/models/socket-client-model';
import { SocketRepository } from '../../domain/repositories/socket-repository';
import { SocketDatasource } from '../datasource/socket-datasource';

@Injectable()
export class SocketRepositoryImpl extends SocketRepository {
  constructor(private readonly socketDatasource: SocketDatasource) {
    super();
  }

  async saveMessage(message: MessageModel): Promise<void> {
    await this.socketDatasource.save(message);
  }

  async getMessages(
    sendUser: UserModel,
    receiveUser: UserModel,
    paginationParams: PaginationParams,
    sortParams: SortParams,
    search: string | undefined,
  ): Promise<MessageModel[]> {
    return await this.socketDatasource.list(
      sendUser,
      receiveUser,
      paginationParams,
      sortParams,
      search,
    );
  }

  async saveSocket(socket: SocketClientModel): Promise<void> {
    await this.socketDatasource.saveSocket(socket);
  }

  async listSocket(
    sendUser: UserModel,
    receiveUser: UserModel,
  ): Promise<SocketClientModel[]> {
    return await this.socketDatasource.listSocket(sendUser, receiveUser);
  }

  async deleteSocket(
    user: UserModel,
    socket: string | undefined,
  ): Promise<void> {
    await this.socketDatasource.deleteSocket(user, socket);
  }
}
