import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MaxLength(30)
  @MinLength(1)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  @MinLength(8)
  password: string;
}
