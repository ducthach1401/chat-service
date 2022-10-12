import { Injectable } from '@nestjs/common';
import { PaginationParams } from 'src/core/models/pagination-params';
import { SortParams } from 'src/core/models/sort-params';
import { UserModel } from 'src/modules/user/domain/models/user-model';
import { MessageModel } from '../../models/message-model';
import { SocketRepository } from '../../repositories/socket-repository';

@Injectable()
export class GetMessagesUsecase {
  constructor(private readonly socketRepository: SocketRepository) {}

  async call(
    sendUser: UserModel,
    receiveUser: UserModel,
    paginationParams: PaginationParams,
    sortParams: SortParams,
    search: string | undefined,
  ): Promise<MessageModel[]> {
    return await this.socketRepository.getMessages(
      sendUser,
      receiveUser,
      paginationParams,
      sortParams,
      search,
    );
  }
}
