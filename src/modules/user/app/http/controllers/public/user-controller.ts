import { Body, Controller, Post } from '@nestjs/common';
import { ErrorCode } from 'src/exceptions/error-code';
import { LogicalException } from 'src/exceptions/logical-exception';
import { Public } from 'src/modules/auth/app/decorators/metadata';
import { GetUserByUsernameUsecase } from 'src/modules/user/domain/usecases/get-user-by-username-usecase';
import { RegisterUserUsecase } from 'src/modules/user/domain/usecases/register-user-usecase';
import { RegisterUserDto } from '../../dtos/register-user-dto';

@Controller('api/v1/user')
export class UserController {
  constructor(
    private readonly registerUserUsecase: RegisterUserUsecase,
    private readonly getUserByUsernameUsecase: GetUserByUsernameUsecase,
  ) {}

  @Public()
  @Post('register')
  async register(@Body() body: RegisterUserDto): Promise<boolean> {
    const user = await this.getUserByUsernameUsecase.call(body.username);
    if (user) {
      throw new LogicalException(
        ErrorCode.USER_ALREADY_EXISTS,
        'Username already exists',
        undefined,
      );
    }
    await this.registerUserUsecase.call(
      body.name,
      body.username,
      body.password,
    );
    return true;
  }
}
