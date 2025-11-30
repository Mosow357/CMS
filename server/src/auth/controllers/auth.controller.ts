
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { AuthService } from '../services/auth.service';  
import { RegisterResponseDto } from '../dto/auth-response.dto'; 
import { ChangePasswordDto } from '../dto/changePassword.dto';
import { Public, RolesG } from 'src/common/guards/roles.decorator';
import { RequestUser } from 'src/common/types/request-user'; 
import { GetUser } from 'src/common/decorators/get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<RequestUser> {
    return await this.authService.login(loginDto.username, loginDto.password);
  }

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto): Promise<RegisterResponseDto> {
    return await this.authService.register(registerDto);
  }

  @Patch('change-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @GetUser() user
  ): Promise<void> {
    return await this.authService.changePassword(changePasswordDto, user.username);
  }
  @Get('validate-token')
  @HttpCode(HttpStatus.OK)
  async validateToken(): Promise<{ success: boolean }> {
    // Guard will handle the validation
    return {
      success: true
    }
  }

  @Get('confirm-email')
  @HttpCode(HttpStatus.OK)
  @Public()
  async confirmEmail(@Param('token') token: string){
    await this.authService.confirmEmail(token);
    return {
      success: true
    }
  }
}