import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { InviteUserToOrganizationDto } from "../dto/inviteUserToOrganization.dto";
import { inviteUserToOrganizationService } from "../services/inviteUserToOrganization.service";
import { AcceptInvitationService } from "../services/acceptInvitation.service";

@Controller('organization-management')
export class OrganizationManagementController {
    constructor(
        private readonly inviteUserToOrganization:inviteUserToOrganizationService,
        private readonly acceptInvitationService:AcceptInvitationService
    ){}
    @Post('invite')
    async inviteUser(@Body() body:InviteUserToOrganizationDto) {
        return this.inviteUserToOrganization.execute(body);
    }
    @Get('invite')
    async acceptInvitation(@Query() token:string) {
        return this.acceptInvitationService.execute(token);
    }
}