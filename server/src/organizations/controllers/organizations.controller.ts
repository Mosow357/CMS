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
} from '@nestjs/common';
import { QueryParamsDto } from 'src/common/dto/queryParams.dto';
import { OrganizationsService } from '../services/organitations.service';
import { CreateOrganizationDto } from '../dto/create-organization.dto';
import { UpdateOrganizationDto } from '../dto/update-organization.dto';

@Controller('organizations')
export class organizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post()
  create(@Body() createorganizationDto: CreateOrganizationDto) {
    return this.organizationsService.create(createorganizationDto);
  }

  @Get()
  findAllUserOrganization(@Query() userId:string) {
    return this.organizationsService.findAllUserOrganization(userId);
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
}
