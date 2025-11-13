import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserDTO {
  @ApiProperty({
    description: 'User ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Username',
    example: 'johndoe',
  })
  username: string;

  @ApiProperty({
    description: 'Email address',
    example: 'john@example.com',
  })
  email: string;

  @ApiPropertyOptional({
    description: 'First name',
    example: 'John',
  })
  name?: string;

  @ApiPropertyOptional({
    description: 'Last name',
    example: 'Doe',
  })
  lastname?: string;

  @ApiProperty({
    description: 'User role',
    example: 'VISITOR',
  })
  role: string;
}
