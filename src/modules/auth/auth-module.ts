import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import auth from 'src/config/auth';
import { UserModule } from '../user/user-module';
import { AuthController } from './app/http/controllers/auth-controller';
import { JwtStrategy } from './app/jwt/jwt-strategy';
import { LoginUsecase } from './domain/usecases/login-usecase';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [auth],
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): any =>
        configService.get<JwtModuleOptions>('auth.jwt'),
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, LoginUsecase],
})
export class AuthModule {}
