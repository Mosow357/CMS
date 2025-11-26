import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { OrganizationsService } from '../services/organitations.service';
import { CreateOrganizationDto } from '../dto/create-organization.dto';
import { UpdateOrganizationDto } from '../dto/update-organization.dto';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { AddUserOrganizationDto } from '../dto/add-userOrganiztion.dto';
import { ChangeRoleDto } from '../dto/update-userOrganiztion.dto';

@Controller('organizations')
export class organizationsController {
  constructor(private readonly organizationsService: OrganizationsService) { }

  @Post()
  create(
    @Body() createorganizationDto: CreateOrganizationDto,
    @GetUser() user:User
  ) {
    return this.organizationsService.create(createorganizationDto,user);
  }

  @Get()
  findUserOrganizations(@GetUser() user: User) {
    return this.organizationsService.findUserOrganizations(user.id);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.organizationsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateorganizationDto: UpdateOrganizationDto,
  ) {
    return this.organizationsService.update(id, updateorganizationDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.organizationsService.remove(id);
  }

  //? ====================== USER ORGANIZATION =====================
  @Post(':orgId/users')
  async addUserToOrganization(
    @Param('orgId') orgId: string,
    @Body() dto: AddUserOrganizationDto,
  ) {
    dto.organizationId = orgId;
    return await this.organizationsService.addUserOrganization(dto);
  }

  @Patch(':orgId/users/:userId/role')
  @HttpCode(HttpStatus.NO_CONTENT)
  async changeUserRole(
    @Param('orgId') orgId: string,
    @Param('userId') userId: string,
    @Body() dto: ChangeRoleDto,
    @GetUser() user:User
  ) {
    await this.organizationsService.changeUserRole(orgId, userId, dto.role, user);
  }
  
  @Delete(':orgId/users/:userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeUserFromOrganization(
    @Param('orgId') orgId: string,
    @Param('userId') userId: string,
    @GetUser() user:User
  ) {
    await this.organizationsService.removeUserFromOrganization(orgId, userId, user.id);
  }
}
