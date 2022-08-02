import { IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @MaxLength(30)
  @MinLength(1)
  name: string;

  @IsString()
  @MaxLength(30)
  @MinLength(1)
  username: string;

  @IsString()
  @MaxLength(30)
  @MinLength(8)
  password: string;
}
