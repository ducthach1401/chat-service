import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth-module';
import { UserModule } from '../user/user-module';
import { SocketController } from './controllers/socket/socket-controller';
import { GetUserByClientSocketUsecase } from './domain/usecases/get-user-by-client-socket-usecase';
import { HandleConnectionUserUsecase } from './domain/usecases/handle-connection-user-usecase';
import { HandleDisconnectionUserUsecase } from './domain/usecases/handle-disconnection-user-usecase';

@Module({
  imports: [forwardRef(() => UserModule), forwardRef(() => AuthModule)],
  providers: [
    SocketController,
    HandleConnectionUserUsecase,
    HandleDisconnectionUserUsecase,
    GetUserByClientSocketUsecase,
  ],
})
export class SocketModule {}
