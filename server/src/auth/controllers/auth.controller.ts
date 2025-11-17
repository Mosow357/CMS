
import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { AuthService } from '../services/auth.service';
import { LoginResponseDto, RegisterResponseDto } from '../dto/auth-response.dto';
import { Public } from 'src/common/decorators/public.decorator'; 
import { ChangePasswordDto } from '../dto/changePassword.dto';
import { GetUser } from '../decorators/get-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { RolesG } from 'src/common/guards/roles.decorator';
import { UserRole } from 'src/common/types/userRole'; 

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

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

  @Post('change_password')
  @HttpCode(HttpStatus.OK)
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @GetUser() user: User
  ): Promise<void> {
    return await this.authService.changePassword(changePasswordDto, user);
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