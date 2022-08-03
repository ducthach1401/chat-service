import { Body, Controller, Post } from '@nestjs/common';
import { LoginUsecase } from 'src/modules/auth/domain/usecases/login-usecase';
import { Public } from '../../decorators/metadata';
import { LoginDto } from '../dtos/login-dto';
import { TokenModel } from '../../../domain/models/token-model';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly loginUsecase: LoginUsecase) {}

  @Public()
  @Post('login')
  async login(@Body() body: LoginDto): Promise<TokenModel> {
    return await this.loginUsecase.call(body.username, body.password);
  }
}
