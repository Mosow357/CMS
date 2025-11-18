import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryParamsDto } from 'src/common/dto/queryParams.dto';
import { CreateOrganitationDto } from '../dto/create-organitation.dto';
import { Organitation } from '../entities/organitation.entity';
import { UpdateOrganitationDto } from '../dto/update-organitation.dto';

@Injectable()
export class OrganitationsService {
  constructor(
    @InjectRepository(Organitation)
    private organitationRepository: Repository<Organitation>,
  ) {}

  async create(createOrganitationDto: CreateOrganitationDto): Promise<Organitation> {
    const organitation = this.organitationRepository.create(createOrganitationDto);
    return this.organitationRepository.save(organitation);
  }

  async findAll(param:QueryParamsDto): Promise<Organitation[]> {
    const {limit,offset,sort} = param
    return this.organitationRepository.find({
      relations: ['members'],
      skip: offset,
      take: limit,
      order:{
        createdAt: sort
      }
    });
  }

  async findOne(id: string): Promise<Organitation> {
    const organitation = await this.organitationRepository.findOne({
      where: { id },
      relations: ['members'],
    });
    if (!organitation) {
      throw new NotFoundException(`Organitation with ID ${id} not found`);
    }
    return organitation;
  }

  async update(id: string, updateOrganitationDto: UpdateOrganitationDto): Promise<Organitation> {
    const organitation = await this.findOne(id);
    Object.assign(organitation, updateOrganitationDto);
    return this.organitationRepository.save(organitation);
  }

  async remove(id: string): Promise<void> {
    const organitation = await this.findOne(id);
    await this.organitationRepository.remove(organitation);
  }
}
