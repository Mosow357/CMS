import { ApiProperty } from '@nestjs/swagger';


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
