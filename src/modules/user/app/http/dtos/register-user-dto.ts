import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @MaxLength(30)
  @MinLength(6)
  name: string;

  @IsString()
  @MaxLength(30)
  @MinLength(6)
  username: string;

  @IsString()
  @MaxLength(30)
  @MinLength(6)
  password: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MaxLength(30)
  @MinLength(1)
  name: string;
}
