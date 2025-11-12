import {
  ConflictException,
  Injectable,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterInput } from '../dto/register.input';
import { UsersService } from 'src/users/services/users.service';
import * as bcrypt from 'bcrypt';
import { LoginOutput } from '../dto/login.output';
import { RegisterOutput } from '../dto/register.output';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login(username: string, password: string): Promise<LoginOutput> {
    let user = await this.userService.findByUsername(username);
    if (!user) throw new UnauthorizedException('User not does not exist');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Invalid password');

    const expiresInDays = 7;
    const expiresIn = `${expiresInDays}d`;

    let payload = this.jwtService.sign(
      { id: user.id, username: user.username, role: user.role },
      { expiresIn: expiresIn },
    );
    const expiredAt = new Date();
    expiredAt.setDate(expiredAt.getDate() + expiresInDays);
    return {
      token: payload,
      expiredAt,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    };
  }

  async register(data: RegisterInput): Promise<RegisterOutput> {
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
