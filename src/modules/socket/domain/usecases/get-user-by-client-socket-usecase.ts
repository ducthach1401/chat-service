import { Injectable } from '@nestjs/common';
import { ErrorCode } from 'src/exceptions/error-code';
import { LogicalException } from 'src/exceptions/logical-exception';
import { GetPayloadByTokenUsecase } from 'src/modules/auth/domain/usecases/get-payload-by-token-usecase';
import { GetUserUsecase } from 'src/modules/user/domain/usecases/get-user-usecase';

@Injectable()
export class GetUserByClientSocketUsecase {
  constructor(
    private readonly getPayloadByTokenUsecase: GetPayloadByTokenUsecase,
    private readonly getUserUsecase: GetUserUsecase,
  ) {}

  async call(client: any) {
    const token = client.handshake.headers.authorization;
    if (!token) {
      throw new LogicalException(
        ErrorCode.TOKEN_FAILED,
        'Token failed.',
        undefined,
      );
    }

    const payload = await this.getPayloadByTokenUsecase.call(
      token.split(' ')[1],
    );

    const user = await this.getUserUsecase.call(payload.user_id, undefined);
    if (!user) {
      throw new LogicalException(
        ErrorCode.USER_NOT_FOUND,
        'User not found.',
        undefined,
      );
    }
    return user;
  }
}
