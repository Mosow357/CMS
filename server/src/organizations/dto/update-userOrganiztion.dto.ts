import { PartialType, PickType } from '@nestjs/mapped-types';
import { AddUserOrganizationDto } from './add-userOrganiztion.dto';

export class UpdateUserOrganizationDto extends PartialType(AddUserOrganizationDto) {}

export class ChangeRoleDto extends PickType(AddUserOrganizationDto,['role'] as const){}