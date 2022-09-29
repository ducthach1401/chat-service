import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/modules/user/domain/models/user-model';
import { v4 as uuidv4 } from 'uuid';
import { SocketClientModel } from '../../models/socket-client-model';
import { SocketRepository } from '../../repositories/socket-repository';

@Injectable()
export class CreateSocketUsecase {
  constructor(private readonly socketRepository: SocketRepository) {}

  async call(user: UserModel, socketId: string): Promise<void> {
    const socket = new SocketClientModel(
      uuidv4(),
      user.id,
      socketId,
      new Date(),
      new Date(),
    );
    await this.socketRepository.saveSocket(socket);
  }
}
