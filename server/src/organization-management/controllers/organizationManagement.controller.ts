import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, Redirect } from "@nestjs/common";
import { InviteUserToOrganizationDto } from "../dto/inviteUserToOrganization.dto";
import { inviteUserToOrganizationService } from "../services/inviteUserToOrganization.service";
import { AcceptInvitationService } from "../services/acceptInvitation.service";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { GetUser } from "src/common/decorators/get-user.decorator";
import { User } from "src/users/entities/user.entity";
import { Public } from "src/common/guards/roles.decorator";
import { FRONT_BASE_URL } from "src/common/constant/constant";

@Controller('organization-management')
export class OrganizationManagementController {
    constructor(
        private readonly inviteUserToOrganization:inviteUserToOrganizationService,
        private readonly acceptInvitationService:AcceptInvitationService
    ){}
    @Post('invite')
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Invite a user to organization' })
    @ApiBody({ type: InviteUserToOrganizationDto })
    async inviteUser(@Body() body:InviteUserToOrganizationDto,@GetUser() user:User) {
        return this.inviteUserToOrganization.execute(body,user.id);
    }
    @Get('invite')
    @Public()
    @ApiOperation({ summary: 'Accept invitation by token query' })
    @ApiQuery({ name: 'token', required: true, description: 'Token received by email' })
    @HttpCode(HttpStatus.FOUND)
    @Redirect(FRONT_BASE_URL+ "/invitation-confirmed", 302)
    async acceptInvitation(@Query("token") token:string) {
        return this.acceptInvitationService.execute(token);
    }
}