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
import { UpdateOrganitationDto } from '../dto/update-organitation.dto';
import { CreateOrganitationDto } from '../dto/create-organitation.dto';
import { OrganitationsService } from '../services/organitations.service';

@Controller('organitations')
export class OrganitationsController {
  constructor(private readonly organitationsService: OrganitationsService) {}

  @Post()
  create(@Body() createOrganitationDto: CreateOrganitationDto) {
    return this.organitationsService.create(createOrganitationDto);
  }

  @Get()
  findAll(@Query() param:QueryParamsDto) {
    return this.organitationsService.findAll(param);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.organitationsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateOrganitationDto: UpdateOrganitationDto,
  ) {
    return this.organitationsService.update(id, updateOrganitationDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.organitationsService.remove(id);
  }
}
