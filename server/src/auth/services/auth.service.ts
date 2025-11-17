import {
  ConflictException,
  Injectable,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from '../dto/register.dto';
import { UsersService } from 'src/users/services/users.service';
import * as bcrypt from 'bcrypt';
import {
  RegisterResponseDto,
} from '../dto/auth-response.dto';
import { JwtService } from '@nestjs/jwt';
import { RequestUser } from 'src/common/types/request-user';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login(username: string, password: string): Promise<RequestUser> {
    const user = await this.userService.findOneWithPassword(username);
    
    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }
    
    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Invalid password');
    }

    const expiresInDays = 7;
    const expiresIn = `${expiresInDays}d`;

    const payload = this.jwtService.sign(
      { id: user.id, username: user.username, role: user.role },
      { expiresIn: expiresIn },
    );
    
    const expiredAt = new Date();
    expiredAt.setDate(expiredAt.getDate() + expiresInDays);
    
    // Remove password from response for security
    const { password: _, ...userWithoutPassword } = user;
    
    return {
      ...userWithoutPassword,
      token: payload,
      tokenExpiredAt: expiredAt,
    } as RequestUser;
  }

  async register(data: RegisterDto): Promise<RegisterResponseDto> {
    const username = data.username.trim().toLowerCase();
    let user = await this.userService.findByUsername(username);
    if (user) throw new ConflictException('User already exists');
    user = await this.userService.create(data);
    if (!user) throw new ServiceUnavailableException('Error creating user');

    return {
      message: 'User registered successfully',
      success: true,
    };
  }
}
