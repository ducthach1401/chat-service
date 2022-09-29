import { Req, UseGuards } from '@nestjs/common';
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
import { SendMessageDto } from '../dtos/socket-gateway-dto';
import { GetPayloadByTokenUsecase } from 'src/modules/auth/domain/usecases/get-payload-by-token-usecase';
import { LogicalException } from 'src/exceptions/logical-exception';
import { ErrorCode } from 'src/exceptions/error-code';

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
    private readonly getPayloadByTokenUsecase: GetPayloadByTokenUsecase,
  ) {}

  @WebSocketServer() server: any;

  @SubscribeMessage('private')
  async privateMessage(@MessageBody() data: SendMessageDto, @Req() req: any) {
    const token = req.handshake.headers.authorization;
    if (!token) {
      throw new LogicalException(
        ErrorCode.AUTH_LOGIN_FAILED,
        'Login failed.',
        undefined,
      );
    }
    const payload = await this.getPayloadByTokenUsecase.call(
      token.split(' ')[1],
    );

    const sendUser = await this.getUserUsecase.call(payload.user_id, undefined);
    if (!sendUser) {
      throw new LogicalException(
        ErrorCode.USER_NOT_FOUND,
        'User not found.',
        undefined,
      );
    }

    const receiveUser = await this.getUserUsecase.call(data.to, undefined);
    if (!receiveUser) {
      throw new LogicalException(
        ErrorCode.USER_NOT_FOUND,
        'User not found.',
        undefined,
      );
    }

    this.server.emit(receiveUser.id, data.content);
    await this.saveMessageUsecase.call(sendUser, receiveUser, data.content);
  }

  async handleConnection(@ConnectedSocket() client: any) {
    const user = await this.getUserByClientSocketUsecase.call(client);
    await this.handleConnectionUserUsecase.call(user, client.id);
  }

  async handleDisconnect(@ConnectedSocket() client: any) {
    const user = await this.getUserByClientSocketUsecase.call(client);
    await this.handleDisconnectionUserUsecase.call(user);
  }
}
