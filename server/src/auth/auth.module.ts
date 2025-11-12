import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [UsersModule],
})
export class AuthModule {}
