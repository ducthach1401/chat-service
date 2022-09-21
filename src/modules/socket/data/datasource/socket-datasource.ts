import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from 'src/modules/user/domain/models/user-model';
import { Repository } from 'typeorm';
import { MessageModel } from '../../domain/models/message-model';
import { MessageEntity } from './entities/message-entity';

@Injectable()
export class SocketDatasource {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
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
  ): Promise<MessageModel[]> {
    const messages = await this.messageRepository.find({
      where: {
        send_user_id: sendUser.id,
        receive_user_id: receiveUser.id,
      },
      order: {
        created_at: 'DESC',
      },
      relations: ['send_user', 'receive_user'],
    });
    console.log(messages);
    return messages.map((message) => message.toModel());
  }
}
