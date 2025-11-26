import { IsString, IsEnum, IsOptional } from 'class-validator';
import { OrganizationRole } from 'src/common/types/userRole';

export class AddUserOrganizationDto {
    @IsString()
    userId: string;

    @IsOptional()
    @IsString()
    organizationId: string;

    @IsEnum(OrganizationRole)
    role: OrganizationRole;
}