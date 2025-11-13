import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  MinLength,
  IsEmail,
} from 'class-validator';
import { UserRole } from '../../common/types/userRole';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example:'John12',
    nullable: false,
    type:'string'
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
    example:'John',
    nullable: true,
    type:'string',
    required:false
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

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
  
  // @ApiPropertyOptional({
  @ApiProperty({
    example:'ADMINISTRATOR',
    nullable: true,
    enum: UserRole
  })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}
