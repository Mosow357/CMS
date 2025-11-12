import { Injectable } from '@nestjs/common';
import { RegisterInput } from '../dto/register.input';

@Injectable()
export class AuthService {
  async login(username: string, password: string) {}

  async register(data: RegisterInput) {}
}
