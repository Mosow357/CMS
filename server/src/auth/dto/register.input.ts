import { IsEmail, IsString } from 'class-validator';

export class RegisterInput {
  @IsString()
  username: string;
  @IsString()
  password: string;
  @IsEmail()
  email: string;
}
