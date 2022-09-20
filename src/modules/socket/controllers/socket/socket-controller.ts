import { UseGuards } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { SocketGuard } from 'src/modules/auth/app/jwt/socket-guard';
import { GetUserByClientSocketUsecase } from '../../domain/usecases/get-user-by-client-socket-usecase';
import { HandleConnectionUserUsecase } from '../../domain/usecases/handle-connection-user-usecase';
import { HandleDisconnectionUserUsecase } from '../../domain/usecases/handle-disconnection-user-usecase';

@UseGuards(SocketGuard)
@WebSocketGateway(parseInt(process.env.SOCKET_PORT), {
  cors: true,
})
export class SocketController
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly handleConnectionUserUsecase: HandleConnectionUserUsecase,
    private readonly handleDisconnectionUserUsecase: HandleDisconnectionUserUsecase,
    private readonly getUserByClientSocketUsecase: GetUserByClientSocketUsecase,
  ) {}

  @WebSocketServer() server: any;

  @SubscribeMessage('room')
  async handleMessage(@MessageBody() data: any) {
    this.server.emit('room', 'data');
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
