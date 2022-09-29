import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { UserModel } from '../models/user-model';
import { UserRepository } from '../repositories/user-repository';
import { Cache } from 'cache-manager';

@Injectable()
export class GetUserUsecase {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async call(id: string, relations: string[] | undefined): Promise<UserModel> {
    return await this.userRepository.get(id, relations);
  }
}
