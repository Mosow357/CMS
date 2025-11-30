import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from "@nestjs/common";
import { InviteUserToOrganizationDto } from "../dto/inviteUserToOrganization.dto";
import { inviteUserToOrganizationService } from "../services/inviteUserToOrganization.service";
import { AcceptInvitationService } from "../services/acceptInvitation.service";
import { ApiBody, ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";

@Controller('organization-management')
export class OrganizationManagementController {
    constructor(
        private readonly inviteUserToOrganization:inviteUserToOrganizationService,
        private readonly acceptInvitationService:AcceptInvitationService
    ){}
    @Post('invite')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Invite a user to organization' })
    @ApiBody({ type: InviteUserToOrganizationDto })
    async inviteUser(@Body() body:InviteUserToOrganizationDto) {
        return this.inviteUserToOrganization.execute(body);
    }
    @Get('invite')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Accept invitation by token query' })
    @ApiQuery({ name: 'token', required: true, description: 'Token received by email' })
    @ApiResponse({ status: 200, description: 'User accepted the invitation.' })
    async acceptInvitation(@Query("token") token:string) {
        return this.acceptInvitationService.execute(token);
    }
}