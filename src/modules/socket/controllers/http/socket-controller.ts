import { Controller, Get, HttpStatus, Param, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { ErrorCode } from 'src/exceptions/error-code';
import { LogicalException } from 'src/exceptions/logical-exception';
import { GetUserUsecase } from 'src/modules/user/domain/usecases/get-user-usecase';
import { GetMessagesUsecase } from '../../domain/usecases/messages/get-messages-usecase';

@Controller('api/v1/message')
export class SocketController {
  constructor(
    private readonly getMessagesUsecase: GetMessagesUsecase,
    private readonly getUserUsecase: GetUserUsecase,
  ) {}

  @Get('id/:id')
  async getMessages(
    @Param() params: any,
    @Req() req: any,
    @Res() res: Response,
  ) {
    const firstUser = await this.getUserUsecase.call(
      req.user.user_id,
      undefined,
    );
    if (!firstUser) {
      throw new LogicalException(
        ErrorCode.USER_NOT_FOUND,
        'user not found.',
        undefined,
      );
    }

    const secondUser = await this.getUserUsecase.call(params.id, undefined);
    if (!secondUser) {
      throw new LogicalException(
        ErrorCode.USER_NOT_FOUND,
        'user not found.',
        undefined,
      );
    }

    const messages = await this.getMessagesUsecase.call(firstUser, secondUser);
    res.status(HttpStatus.OK).json(messages.map((message) => message.toJson()));
  }
}
