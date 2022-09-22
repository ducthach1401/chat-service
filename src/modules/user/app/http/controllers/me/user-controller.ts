import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorCode } from 'src/exceptions/error-code';
import { LogicalException } from 'src/exceptions/logical-exception';
import { GetUserUsecase } from 'src/modules/user/domain/usecases/get-user-usecase';
import { UpdateUserPasswordUsecase } from 'src/modules/user/domain/usecases/update-user-password-usecase';
import { UpdateUserUsecase } from 'src/modules/user/domain/usecases/update-user-usecase';
import {
  UpdatePasswordUserDto,
  UpdateUserDto,
} from '../../dtos/register-user-dto';

@Controller('api/user/v1/me')
export class UserController {
  constructor(
    private readonly getUserUsecase: GetUserUsecase,
    private readonly updateUserUsecase: UpdateUserUsecase,
    private readonly updateUserPasswordUsecase: UpdateUserPasswordUsecase,
  ) {}

  @Get()
  async getInfo(@Req() req: any, @Res() res: Response) {
    const result = await this.getUserUsecase.call(req.user.user_id, undefined);
    if (!result) {
      throw new LogicalException(
        ErrorCode.USER_NOT_FOUND,
        'User not found.',
        undefined,
      );
    }
    res.status(HttpStatus.OK).json(result.toJson());
  }

  @Put('update')
  async update(@Req() req: any, @Body() body: UpdateUserDto): Promise<boolean> {
    const user = await this.getUserUsecase.call(req.user.user_id, undefined);
    if (!user) {
      throw new LogicalException(
        ErrorCode.USER_NOT_FOUND,
        'User not found',
        undefined,
      );
    }

    await this.updateUserUsecase.call(user, body.name, undefined);
    return true;
  }

  @Post('update/password')
  async password(
    @Req() req: any,
    @Body() body: UpdatePasswordUserDto,
  ): Promise<boolean> {
    const user = await this.getUserUsecase.call(req.user.user_id, undefined);
    if (!user) {
      throw new LogicalException(
        ErrorCode.USER_NOT_FOUND,
        'User not found',
        undefined,
      );
    }

    await this.updateUserPasswordUsecase.call(user, body.password);
    return true;
  }
}
