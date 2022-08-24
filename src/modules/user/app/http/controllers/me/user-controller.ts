import { Body, Controller, Get, Put, Req } from '@nestjs/common';
import { ErrorCode } from 'src/exceptions/error-code';
import { LogicalException } from 'src/exceptions/logical-exception';
import { UserModel } from 'src/modules/user/domain/models/user-model';
import { GetUserUsecase } from 'src/modules/user/domain/usecases/get-user-usecase';
import { UpdateUserUsecase } from 'src/modules/user/domain/usecases/update-user-usecase';
import { UpdateUserDto } from '../../dtos/register-user-dto';

@Controller('api/user/v1/me')
export class UserController {
  constructor(
    private readonly getUserUsecase: GetUserUsecase,
    private readonly updateUserUsecase: UpdateUserUsecase,
  ) {}
  @Get()
  async getInfo(@Req() req: any): Promise<UserModel> {
    const result = await this.getUserUsecase.call(req.user.id);
    return result;
  }

  @Put('update')
  async update(@Req() req: any, @Body() body: UpdateUserDto): Promise<boolean> {
    const user = await this.getUserUsecase.call(req.user.id);
    if (!user) {
      throw new LogicalException(
        ErrorCode.USER_NOT_FOUND,
        'User not found',
        undefined,
      );
    }

    await this.updateUserUsecase.call(user, body.name);
    return true;
  }
}