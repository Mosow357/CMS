import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterInput } from '../dto/register.input';
import { UsersService } from 'src/users/services/users.service';
import * as bcrypt from 'bcrypt';
import { LoginOutput } from '../dto/login.output';
import { RegisterOutput } from '../dto/register.output';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}
  async login(username: string, password: string): Promise<LoginOutput> {
    let user = await this.userService.findByUsername(username);
    if (!user) throw new UnauthorizedException('User not does not exist');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Invalid password');

    //TODO: implementar jwt
    return {} as LoginOutput;
  }

  async register(data: RegisterInput): Promise<RegisterOutput> {
    let user = await this.userService.findByUsername(data.username);
    if (user) throw new ConflictException('User already exists');

    user = await this.userService.create(data);
    if (!user) throw new UnauthorizedException('Error creating user');

    return {
      message: 'User registered successfully',
      success: true,
    };
  }
}
