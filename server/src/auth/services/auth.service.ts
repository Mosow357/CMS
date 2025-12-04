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
  RegisterResponseDto,
} from '../dto/auth-response.dto';
import { JwtService } from '@nestjs/jwt';
import { ChangePasswordDto } from '../dto/changePassword.dto';
import { User } from 'src/users/entities/user.entity';
import { EncoderService } from '../../common/services/encoder.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestUser } from 'src/common/types/request-user';
import { NotificationsService } from 'src/notifications/services/notifications.service';
import { ConfirmEmailTemplate } from 'src/notifications/email-templates/confirmEmail.template';
import { EmailVerificationService } from './emailVerification.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UsersService,
    private jwtService: JwtService,
    private encoderService: EncoderService,
    private notificationService: NotificationsService,
    private emailVerificationService: EmailVerificationService,
  ) { }
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
      { id: user.id, username: user.username },
      { expiresIn: expiresIn },
    );

    const expiredAt = new Date();
    expiredAt.setDate(expiredAt.getDate() + expiresInDays);

    // Remove password from response for security
    const { password: _, ...userWithoutPassword } = user;

    return {
      ...userWithoutPassword,
      token: payload,
      tokenExpiredAt: expiredAt
    };
  }

  async register(data: RegisterDto): Promise<RegisterResponseDto> {
    const normalizedEmail = data.email.trim().toLowerCase();

    try {
      const user = await this.userService.create({
        ...data,
        email: normalizedEmail,
      });

      const confirmEmailToken = await this.encoderService.generateToken();
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

      await this.emailVerificationService.create(
        normalizedEmail,
        confirmEmailToken,
        expiresAt,
      );

      const template = new ConfirmEmailTemplate(
        normalizedEmail,
        user.username,
        confirmEmailToken,
      );
      try {
        await this.notificationService.sendNotificationWithTemplate(template);
      }
      catch (error) {
        console.error('Error sending confirmation email:', error);
      }


      return {
        message: 'User registered successfully',
        success: true,
      };

    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT' || error.code === '23505') {
        throw new ConflictException('Email or username already exists');
      }

      throw new ServiceUnavailableException('Error creating user');
    }
  }

  async changePassword(changePasswordDto: ChangePasswordDto, username: string): Promise<void> {
    const { newPassword, oldPassword } = changePasswordDto
    const user = await this.userService.findOneWithPassword(username)

    if (!user)
      throw new NotFoundException('Username Not found')

    if (newPassword === oldPassword)
      throw new BadRequestException("The new password can't be similar to the old password")

    if (!await this.encoderService.checkPassword(oldPassword, user?.password))
      throw new BadRequestException('The old password does not match')

    user.password = await this.encoderService.encodePassword(newPassword);
    await this.userRepository.save(user)
  }

  async confirmEmail(token: string) {
    const emailVerification = await this.emailVerificationService.findByToken(token);
    if (!emailVerification)
      throw new BadRequestException('Invalid token')

    if (emailVerification.expiresAt < new Date())
      throw new BadRequestException('Token expired')

    if (emailVerification.usedAt)
      throw new BadRequestException('Token already used')

    const user = await this.userService.findByUsernameOrEmail(emailVerification.email);
    if (!user)
      throw new NotFoundException('User not found')

    emailVerification.usedAt = new Date();
    user.email_confirmed = true;
    await this.userService.update(user.id, user);
    await this.emailVerificationService.update(emailVerification);
    return true
  }
}
