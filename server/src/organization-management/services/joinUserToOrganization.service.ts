import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { OrganizationRole } from 'src/common/types/userRole';
import { OrganizationsService } from 'src/organizations/services/organizations.service';
import { UserOrganizationService } from 'src/user_organization/services/userOrganization.service';
import { UsersService } from 'src/users/services/users.service';
import { JoinUserToOrganizationDto } from '../dto/joinUserToOrganization.dto';



@Injectable()
export class JoinUserToOrganizationService {

  constructor(
    private readonly organizationsService: OrganizationsService,
    private readonly userOrganizationService: UserOrganizationService,
  ) {}

  async execute(input: JoinUserToOrganizationDto) {
    const existsOrganization = await this.organizationsService.findOne(input.organizationId);
        if (!existsOrganization) throw new NotFoundException('Organization not found');
    
        const existsUserInOrg = await this.userOrganizationService.findUserOrganization(input.userId, input.organizationId);
        if (existsUserInOrg) throw new ConflictException('User already member of the organization');
    
        const userOrganization = this.userOrganizationService.create({
          userId: input.userId,
          organizationId: input.organizationId,
          role: input.role ?? OrganizationRole.EDITOR,
        });
    
        return userOrganization;
  }
}