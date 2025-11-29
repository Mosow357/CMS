import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { InviteUserToOrganizationDto } from "../dto/inviteUserToOrganization.dto";
import { inviteUserToOrganizationService } from "../services/inviteUserToOrganization.service";

@Controller('organization-management')
export class OrganizationManagementController {
    constructor(private readonly inviteUserToOrganization:inviteUserToOrganizationService){}
    @Post('invite')
    async inviteUser(@Body() body:InviteUserToOrganizationDto) {
        return this.inviteUserToOrganization.execute(body);
    }
    @Get('invite')
    async acceptInvitation(@Query() token:string) {
        //return this.inviteUserToOrganization.execute(body);
    }
}