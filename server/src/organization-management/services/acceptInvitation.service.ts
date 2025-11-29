import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InvitationsService } from "./invitations.service";
import { EncoderService } from "src/common/services/encoder.service";
import { OrganizationRole } from "src/common/types/userRole";
import { UserOrganizationService } from "src/user_organization/services/userOrganization.service";
import { OrganizationsService } from "src/organizations/services/organizations.service";

@Injectable()
export class AcceptInvitationService {

  constructor(
    private readonly organizationsService: OrganizationsService,
    private readonly userOrganizationService: UserOrganizationService,
    private readonly invitationsService: InvitationsService,
    private readonly encoderService: EncoderService,
  ) { }

  async execute(token: string) {
    const hashedToken = await this.encoderService.encodeToken(token);
    const invitation = await this.invitationsService.findByHashedToken(hashedToken);
    if(!invitation) throw new NotFoundException('Invitation not found');
    
    const existsOrganization = await this.organizationsService.findOne(invitation.organizationId);
    if (!existsOrganization) throw new NotFoundException('Organization not found');

    const existsUserInOrg = await this.userOrganizationService.findUserOrganization(invitation.user_id, invitation.organizationId);
    if (existsUserInOrg) throw new ConflictException('User already member of the organization');

    const userOrganization = this.userOrganizationService.create({
      userId: invitation.user_id,
      organizationId: invitation.organizationId,
      role: invitation.role_asigned as OrganizationRole,
    });
    return userOrganization;
  }
}