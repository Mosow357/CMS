import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateOrganitationDto {
  @ApiProperty({
      description: 'Name of the organitation',
      example: 'organitation_1',
    })
  @IsString()
  @IsNotEmpty()
  name: string;
}
