import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganitationDto } from './create-organitation.dto';

export class UpdateOrganitationDto extends PartialType(CreateOrganitationDto) {}
