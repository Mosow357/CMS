import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { NotificationsService } from "src/notifications/services/notifications.service";
import { OrganizationsService } from "src/organizations/services/organizations.service";
import { UserOrganizationService } from "src/user_organization/services/userOrganization.service";
import { InviteUserToOrganizationDto } from "../dto/inviteUserToOrganization.dto";
import { UsersService } from "src/users/services/users.service";
import { InvitationEmailTemplate } from "src/notifications/email-templates/invitation.template";
import { InvitationsService } from "./invitations.service";
import { createHash, randomBytes } from "crypto";

@Injectable()
export class inviteUserToOrganizationService {
    constructor(
        private readonly organizationsService: OrganizationsService,
        private readonly userOrganizationService: UserOrganizationService,
        private readonly userService: UsersService,
        private readonly invitationService: InvitationsService,
        private readonly notificationService: NotificationsService
    ) { }

    async execute(input: InviteUserToOrganizationDto) {
        const invitedUser = await this.userService.findByUsernameOrEmail(input.email);
        if (!invitedUser) throw new NotFoundException('User not found');

        const organization = await this.organizationsService.findOne(input.organizationId);
        if (!organization) throw new NotFoundException('Organization not found');

        const existsUserInOrg = await this.userOrganizationService.findUserOrganization(invitedUser.id, input.organizationId);
        if (existsUserInOrg) throw new ConflictException('User already member of the organization');

        const { token, hashedToken } = this.generateToken();

        let notification: InvitationEmailTemplate = new InvitationEmailTemplate({
            organizationName: organization.name,
            toEmail: invitedUser.email,
            token:token,
            username: invitedUser.username
        });

        let expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

        await this.invitationService.createInvitation({
            organizationId: organization.id,
            role_asigned: input.role,
            expires_at: expiresAt,
            used_at: null,
            user_id: invitedUser.id,
            token_hashed: hashedToken
        });

        return this.notificationService.sendNotificationWithTemplate(notification);
    }

    private generateToken() {
        const token = randomBytes(32).toString('hex');
        const hashedToken = createHash('sha256').update(token).digest('hex');
        return {hashedToken,token};
    }
}