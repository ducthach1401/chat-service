import { CACHE_MANAGER, Inject, UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { SocketGuard } from 'src/modules/auth/app/jwt/socket-guard';
import { GetUserUsecase } from 'src/modules/user/domain/usecases/get-user-usecase';
import { GetUserByClientSocketUsecase } from '../../domain/usecases/get-user-by-client-socket-usecase';
import { HandleConnectionUserUsecase } from '../../domain/usecases/handle-connection-user-usecase';
import { HandleDisconnectionUserUsecase } from '../../domain/usecases/handle-disconnection-user-usecase';
import { SaveMessageUsecase } from '../../domain/usecases/messages/save-message-usecase';
import { Cache } from 'cache-manager';
import { SendMessageDto } from '../dtos/socket-gateway-dto';

@UseGuards(SocketGuard)
@WebSocketGateway(parseInt(process.env.SOCKET_PORT), {
  cors: true,
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly handleConnectionUserUsecase: HandleConnectionUserUsecase,
    private readonly handleDisconnectionUserUsecase: HandleDisconnectionUserUsecase,
    private readonly getUserByClientSocketUsecase: GetUserByClientSocketUsecase,
    private readonly saveMessageUsecase: SaveMessageUsecase,
    private readonly getUserUsecase: GetUserUsecase,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @WebSocketServer() server: any;

  @SubscribeMessage('private')
  async handleMessage(
    @MessageBody() data: SendMessageDto,
    @ConnectedSocket() client: any,
  ) {
    const sendUserId = await this.cacheManager.get<string>(client.id);
    const sendUser = await this.getUserUsecase.call(sendUserId, undefined);

    const receiveUser = await this.getUserUsecase.call(data.to, undefined);
    if (!receiveUser) {
      return undefined;
    }

    this.server.to(receiveUser.socketId).emit('private', data.content);
    
    await this.saveMessageUsecase.call(sendUser, receiveUser, data.content);
  }

  async handleConnection(client: any) {
    const user = await this.getUserByClientSocketUsecase.call(client);
    if (!user) {
      return false;
    }
    await this.handleConnectionUserUsecase.call(user, client.id);
  }

  async handleDisconnect(client: any) {
    const user = await this.getUserByClientSocketUsecase.call(client);
    if (!user) {
      return false;
    }
    await this.handleDisconnectionUserUsecase.call(user);
  }
}
