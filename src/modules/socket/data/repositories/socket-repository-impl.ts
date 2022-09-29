import { Injectable } from '@nestjs/common';
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
  ): Promise<MessageModel[]> {
    return await this.socketDatasource.list(sendUser, receiveUser);
  }

  async saveSocket(socket: SocketClientModel): Promise<void> {
    await this.socketDatasource.saveSocket(socket);
  }

  async listSocket(user: UserModel): Promise<SocketClientModel[]> {
    return await this.socketDatasource.listSocket(user);
  }

  async deleteSocket(
    user: UserModel,
    socket: string | undefined,
  ): Promise<void> {
    await this.socketDatasource.deleteSocket(user, socket);
  }
}
