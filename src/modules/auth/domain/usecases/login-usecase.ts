import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CheckUserUsecase } from 'src/modules/user/domain/usecases/check-user-usecase';
import { TokenModel } from '../models/token-model';

@Injectable()
export class LoginUsecase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly checkUserUsecase: CheckUserUsecase,
  ) {}

  async call(username: string, password: string): Promise<TokenModel> {
    const payload = await this.checkUserUsecase.call(username, password);
    const jwt = await this.jwtService.signAsync(payload);

    return new TokenModel(jwt, 'JWT');
  }
}
