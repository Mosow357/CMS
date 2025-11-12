import { Body, Controller, Post } from '@nestjs/common';
import { LoginInput } from '../dto/login.input';
import { RegisterInput } from '../dto/register.input';
import { AuthService } from '../services/auth.service';
import { LoginOutput } from '../dto/login.output';
import { RegisterOutput } from '../dto/register.output';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() input: LoginInput): Promise<LoginOutput> {
    return await this.authService.login(input.username, input.password);
  }
  @Post('register')
  async register(@Body() input: RegisterInput): Promise<RegisterOutput> {
    return await this.authService.register(input);
  }
}
