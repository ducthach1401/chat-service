import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GetPayloadByTokenUsecase {
  constructor(private readonly jwtService: JwtService) {}

  async call(token: string): Promise<Record<string, any>> {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (error) {
      return undefined;
    }
  }
}
