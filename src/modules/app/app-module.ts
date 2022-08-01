import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import app from 'src/config/app';
import { UserModule } from '../user/user-module';
import { AppController } from './app-controller';
import { AppService } from './app-service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [app],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
