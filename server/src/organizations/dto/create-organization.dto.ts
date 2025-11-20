import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateOrganizationDto {
  @ApiProperty({
      description: 'Name of the Organization',
      example: 'Organization_1',
    })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
      description: 'Name of the Organization',
      example: 'Organization_1 is focused on delivering quality products.',
    })
  @IsString()
  @IsOptional()
  description: string;
}
