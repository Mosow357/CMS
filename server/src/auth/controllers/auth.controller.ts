import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { AuthService } from '../services/auth.service';
import { LoginResponseDto, RegisterResponseDto } from '../dto/auth-response.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { Role } from 'src/common/enums';
import { RolesG } from 'src/common/guards/roles.decorator';
import { UserRole } from 'src/common/types/userRole';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return await this.authService.login(loginDto.username, loginDto.password);
  }

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto): Promise<RegisterResponseDto> {
    return await this.authService.register(registerDto);
  }
  @Get('validate-token')
  @RolesG(UserRole.ADMINISTRATOR, UserRole.EDITOR)
  @HttpCode(HttpStatus.OK)
  async validateToken(): Promise<{ success: boolean }> {
    // Guard will handle the validation
    return {
      success: true
    }
  }
}
