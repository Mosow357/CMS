import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { NotificationsService } from "src/notifications/services/notifications.service";
import { OrganizationsService } from "src/organizations/services/organizations.service";
import { UserOrganizationService } from "src/user_organization/services/userOrganization.service";
import { InviteUserToOrganizationDto } from "../dto/inviteUserToOrganization.dto";
import { UsersService } from "src/users/services/users.service";
import { InvitationEmailTemplate } from "src/notifications/email-templates/invitation.template";

@Injectable()
export class inviteUserToOrganizationService {

    constructor(
        private readonly organizationsService: OrganizationsService,
        private readonly userOrganizationService: UserOrganizationService,
        private readonly userService: UsersService,
        private readonly notificationService: NotificationsService
    ) { }

    async execute(input: InviteUserToOrganizationDto) {
        const invitedUser = await this.userService.findByUsernameOrEmail(input.email);
        if (!invitedUser) throw new NotFoundException('User not found');

        const existsOrganization = await this.organizationsService.findOne(input.organizationId);
        if (!existsOrganization) throw new NotFoundException('Organization not found');

        const existsUserInOrg = await this.userOrganizationService.findUserOrganization(invitedUser.id, input.organizationId);
        if (existsUserInOrg) throw new ConflictException('User already member of the organization');
        
        let notification:InvitationEmailTemplate = new InvitationEmailTemplate({
            organizationName: existsOrganization.name,
            toEmail: invitedUser.email,
            token: this.generateToken(),
            username: invitedUser.username
        });
        
        await this.notificationService.sendNotificationWithTemplate(notification);
    }

    private generateToken(): string {
        return Math.random().toString(36).substr(2, 8).toUpperCase();
    }
}