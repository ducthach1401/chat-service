import { PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { UserListQuery } from 'src/modules/user/app/http/dtos/user-dto';

export class SendMessageDto {
  @IsString()
  to: string;

  @IsString()
  content: string;
}

export class GetMessagesQuery extends PickType(UserListQuery, [
  'page',
  'limit',
  'search',
]) {}
