import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from '../dto/register.dto';
import { UsersService } from 'src/users/services/users.service';
import * as bcrypt from 'bcrypt';
import {
  LoginResponseDto,
  RegisterResponseDto,
} from '../dto/auth-response.dto';
import { JwtService } from '@nestjs/jwt';
import { ChangePasswordDto } from '../dto/changePassword.dto';
import { User } from 'src/users/entities/user.entity';
import { EncoderService } from './encoder.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository:Repository<User>,
    private readonly userService: UsersService,
    private jwtService: JwtService,
    private encoderService: EncoderService
  ) {}
  async login(username: string, password: string): Promise<LoginResponseDto> {
    let user = await this.userService.findOneWithPassword(username);
    console.log(user, '<<<<<<<<<<<<<<<< USER');
    if (!user) throw new UnauthorizedException('User does not exist');
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

  async changePassword(changePasswordDto: ChangePasswordDto,username:string):Promise<void>{
    const {newPassword,oldPassword} = changePasswordDto
    const user = await this.userService.findOneWithPassword(username)
    
    if(!user)
      throw new NotFoundException('Username Not found')

    if(newPassword === oldPassword) 
      throw new BadRequestException("The new password can't be similar to the old password")

    if(!await this.encoderService.checkPassword(oldPassword,user?.password))
      throw new BadRequestException('The old password does not match')

    user.password = await  this.encoderService.encodePassword(newPassword);
    await this.userRepository.save(user)
  }
}
