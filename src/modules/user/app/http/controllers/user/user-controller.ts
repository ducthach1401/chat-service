import { Controller, Get, HttpStatus, Query, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { PaginationParams } from 'src/core/models/pagination-params';
import { SortParams } from 'src/core/models/sort-params';
import { ErrorCode } from 'src/exceptions/error-code';
import { LogicalException } from 'src/exceptions/logical-exception';
import { GetUserUsecase } from 'src/modules/user/domain/usecases/get-user-usecase';
import { GetUsersUsecase } from 'src/modules/user/domain/usecases/get-users-usecase';
import { UserListQuery } from '../../dtos/user-dto';

@Controller('api/user/v1/users')
export class UserController {
  constructor(
    private readonly getUsersUsecase: GetUsersUsecase,
    private readonly getUserUsecase: GetUserUsecase,
  ) {}

  @Get()
  async list(
    @Req() req: any,
    @Query() query: UserListQuery,
    @Res() res: Response,
  ) {
    const user = await this.getUserUsecase.call(req.user.user_id, undefined);
    if (!user) {
      throw new LogicalException(
        ErrorCode.USER_NOT_FOUND,
        'User not found.',
        undefined,
      );
    }
    const users = await this.getUsersUsecase.call(
      user,
      new PaginationParams(query.page, query.limit),
      new SortParams(query.sort, query.dir),
      query.search,
    );
    res.status(HttpStatus.OK).json(users.map((user) => user.toJson()));
  }
}
