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
      description: 'Name of the Organization',
      example: 'Organization_1 is focused on delivering quality products.',
    })
  @IsString()
  @IsOptional()
  description: string;

  @ApiPropertyOptional({
    description: 'Question text displayed to the end user (editable by admin)',
    example: 'What did you think of this experience?',
    required: false,
  })
  @IsString()
  @IsOptional()
  questionText: string;
}
