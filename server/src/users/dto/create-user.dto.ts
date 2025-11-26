import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  MinLength,
  IsEmail,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Unique username for the user account.',
    example: 'John12',
    nullable: false,
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  username: string;
  
  @ApiProperty({
    example:'JohnDOE1234',
    nullable: false,
    minLength: 6
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string; 
  
  @ApiPropertyOptional({
    description: 'Email address of the user. Optional field.',
    example: 'john@example.com',
    nullable: true,
    type: 'string',
    required: false,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiPropertyOptional({
    description: 'First name of the user.',
    example: 'John',
    nullable: true,
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;
  
  @ApiPropertyOptional({
    example:'Doe',
    nullable: true,
    type:'string',
    required:false
  })
  @IsString()
  @IsOptional()
  lastname?: string;
}
