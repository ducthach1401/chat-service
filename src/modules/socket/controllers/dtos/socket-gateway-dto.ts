import { IsString } from 'class-validator';

export class SendMessageDto {
  @IsString()
  to: string;

  @IsString()
  content: string;
}
