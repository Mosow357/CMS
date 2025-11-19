import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateOrganizationDto {
  @ApiProperty({
      description: 'Name of the Organization',
      example: 'Organization_1',
    })
  @IsString()
  @IsNotEmpty()
  name: string;
}
