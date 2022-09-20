import { UseGuards } from '@nestjs/common';
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
    private readonly saveMessageUsecase: SaveMessageUsecase,
    private readonly getUserUsecase: GetUserUsecase,
  ) {}

  @WebSocketServer() server: any;

  @SubscribeMessage('room')
  async handleMessage(
    @MessageBody() data: any,
    @ConnectedSocket() client: any,
  ) {
    const sendUser = await this.getUserUsecase.call(
      'ab2c1e4a-c7e9-4ecd-a46b-72247086c96b',
      undefined,
    );
    const receiveUser = await this.getUserUsecase.call(
      '0c5e838a-a6b8-4fcf-9c96-cc816620e074',
      undefined,
    );
    await this.saveMessageUsecase.call(receiveUser, sendUser, 'data1');
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
