import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/modules/user/domain/models/user-model';
import { SocketClientModel } from '../../models/socket-client-model';
import { SocketRepository } from '../../repositories/socket-repository';

@Injectable()
export class DeleteSocketUsecase {
  constructor(private readonly socketRepository: SocketRepository) {}

  async call(user: UserModel, socket: string | undefined): Promise<void> {
    await this.socketRepository.deleteSocket(user, socket);
  }
}
