import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateOrganizationDto {
  @ApiProperty({
      description: 'Name of the Organization',
      example: 'Organization_1',
    })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
      description: 'Description of the Organization',
      example: 'This is my organization',
    })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
      description: "Organization's logo",
      example: 'www.mylogo.png',
    })
  @IsString() 
  @IsOptional()
  logoUrl?: string;
}
