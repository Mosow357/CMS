import { IsString, MinLength } from 'class-validator';

export class LoginInput {
  @IsString()
  username: string;
  @IsString()
  @MinLength(6)
  password: string;
}
