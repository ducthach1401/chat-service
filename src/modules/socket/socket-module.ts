import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth-module';
import { UserModule } from '../user/user-module';
import { SocketController } from './controllers/http/socket-controller';
import { SocketGateway } from './controllers/socket/socket-gateway';
import { MessageEntity } from './data/datasource/entities/message-entity';
import { SocketDatasource } from './data/datasource/socket-datasource';
import { SocketRepositoryImpl } from './data/repositories/socket-repository-impl';
import { SocketRepository } from './domain/repositories/socket-repository';
import { GetUserByClientSocketUsecase } from './domain/usecases/get-user-by-client-socket-usecase';
import { HandleConnectionUserUsecase } from './domain/usecases/handle-connection-user-usecase';
import { HandleDisconnectionUserUsecase } from './domain/usecases/handle-disconnection-user-usecase';
import { GetMessagesUsecase } from './domain/usecases/messages/get-messages-usecase';
import { SaveMessageUsecase } from './domain/usecases/messages/save-message-usecase';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([MessageEntity]),
  ],
  controllers: [SocketController],
  providers: [
    SocketGateway,
    {
      provide: SocketRepository,
      useClass: SocketRepositoryImpl,
    },
    SocketDatasource,
    HandleConnectionUserUsecase,
    HandleDisconnectionUserUsecase,
    GetUserByClientSocketUsecase,
    SaveMessageUsecase,
    GetMessagesUsecase,
  ],
})
export class SocketModule {}
