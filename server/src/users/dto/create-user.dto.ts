import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  MinLength,
  IsEmail,
} from 'class-validator';
import { Role } from '../../common/enums';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  lastname?: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}
