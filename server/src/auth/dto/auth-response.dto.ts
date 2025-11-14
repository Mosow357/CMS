import { ApiProperty } from '@nestjs/swagger';
import { UserDTO } from './user.dto';

export class LoginResponseDto {
  @ApiProperty({
    description: 'JWT authentication token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  token: string;

  @ApiProperty({
    description: 'Token expiration date',
    example: '2025-01-20T10:00:00.000Z',
  })
  expiredAt: Date;

  @ApiProperty({
    description: 'User information',
    type: UserDTO,
  })
  user: UserDTO;
}

export class RegisterResponseDto {
  @ApiProperty({
    description: 'Success message',
    example: 'User registered successfully',
  })
  message: string;

  @ApiProperty({
    description: 'Registration success status',
    example: true,
  })
  success: boolean;
}
