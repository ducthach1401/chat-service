import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationParams } from 'src/core/models/pagination-params';
import { SortParams } from 'src/core/models/sort-params';
import { UserModel } from 'src/modules/user/domain/models/user-model';
import { FindOptionsWhere, Repository } from 'typeorm';
import { MessageModel } from '../../domain/models/message-model';
import { SocketClientModel } from '../../domain/models/socket-client-model';
import { MessageEntity } from './entities/message-entity';
import { SocketClientsEntity } from './entities/socket-client-entity';

@Injectable()
export class SocketDatasource {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
    @InjectRepository(SocketClientsEntity)
    private readonly socketClientRepository: Repository<SocketClientsEntity>,
  ) {}

  async save(message: MessageModel): Promise<void> {
    const entity = new MessageEntity();
    entity.id = message.id;
    entity.receive_user_id = message.receiveUserId;
    entity.send_user_id = message.sendUserId;
    entity.data = message.data;
    entity.created_at = message.createdAt;
    entity.updated_at = message.updatedAt;
    await this.messageRepository.save(entity);
  }

  async list(
    sendUser: UserModel,
    receiveUser: UserModel,
    paginationParams: PaginationParams,
    sortParams: SortParams,
    search: string | undefined,
  ): Promise<MessageModel[]> {
    if (search) {
    }
    const messages = await this.messageRepository.find({
      where: [
        {
          send_user_id: sendUser.id,
          receive_user_id: receiveUser.id,
        },
        {
          send_user_id: receiveUser.id,
          receive_user_id: sendUser.id,
        },
      ],
      order: {
        [sortParams.sort]: sortParams.dir,
      },
      skip: (paginationParams.page - 1) * paginationParams.limit,
      take: paginationParams.limit,
      relations: ['send_user', 'receive_user'],
    });
    return messages.map((message) => message.toModel()).reverse();
  }

  async saveSocket(socket: SocketClientModel): Promise<void> {
    const entity = new SocketClientsEntity();
    entity.id = socket.id;
    entity.user_id = socket.userId;
    entity.socket_id = socket.socketId;
    entity.created_at = socket.createdAt;
    entity.updated_at = socket.updatedAt;
    await this.socketClientRepository.save(entity);
  }

  async listSocket(
    sendUser: UserModel,
    receiveUser: UserModel,
  ): Promise<SocketClientModel[]> {
    const sockets = await this.socketClientRepository.find({
      where: [
        {
          user_id: sendUser.id,
        },
        {
          user_id: receiveUser.id,
        },
      ],
    });

    return sockets.map((socket) => socket.toModel());
  }

  async deleteSocket(
    user: UserModel,
    socket: string | undefined,
  ): Promise<void> {
    const cond: FindOptionsWhere<SocketClientsEntity> = {
      user_id: user.id,
    };
    if (socket) {
      cond.socket_id = socket;
    }
    await this.socketClientRepository.delete(cond);
  }
}
