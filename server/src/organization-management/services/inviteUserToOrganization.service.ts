import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { NotificationsService } from "src/notifications/services/notifications.service";
import { OrganizationsService } from "src/organizations/services/organizations.service";
import { UserOrganizationService } from "src/user_organization/services/userOrganization.service";
import { InviteUserToOrganizationDto } from "../dto/inviteUserToOrganization.dto";
import { UsersService } from "src/users/services/users.service";

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

        //TODO:Implements template in notification module for organization invite
        //await this.notificationService.sendNotificationWithTemplate();
    }
}