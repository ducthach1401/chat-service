import { Injectable } from '@nestjs/common';
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
      return undefined;
    }

    const payload = await this.getPayloadByTokenUsecase.call(
      token.split(' ')[1],
    );
    if (!payload) {
      return undefined;
    }

    const user = await this.getUserUsecase.call(payload.user_id, undefined);
    if (!user) {
      return undefined;
    }
    return user;
  }
}
