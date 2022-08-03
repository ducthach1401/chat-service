import { Body, Controller, Get, Post, Put, Req, Res } from '@nestjs/common';
import { Public } from 'src/modules/auth/app/decorators/metadata';
import { UserModel } from 'src/modules/user/domain/models/user-model';
import { GetUserUsecase } from 'src/modules/user/domain/usecases/get-user-usecase';
import { RegisterUserUsecase } from 'src/modules/user/domain/usecases/register-user-usecase';
import { UpdateUserUsecase } from 'src/modules/user/domain/usecases/update-user-usecase';
import { RegisterUserDto } from '../dtos/register-user-dto';
import { UpdateUserDto } from '../dtos/update-user-dto';

@Controller('api/v1/user')
export class UserController {
  constructor(
    private readonly getUserUsecase: GetUserUsecase,
    private readonly updateUserUsecase: UpdateUserUsecase,
    private readonly registerUserUsecase: RegisterUserUsecase,
  ) {}

  @Public()
  @Post('register')
  async register(@Body() body: RegisterUserDto): Promise<boolean> {
    await this.registerUserUsecase.call(body);
    return true;
  }

  @Get()
  async getInfo(@Req() req: any): Promise<UserModel> {
    const result = await this.getUserUsecase.call(req.user.id);
    return result;
  }

  @Put('update')
  async update(@Req() req: any, @Body() body: UpdateUserDto): Promise<boolean> {
    await this.updateUserUsecase.call(
      req.user.id,
      body.name,
      body.password,
    );
    return true;
  }
}
